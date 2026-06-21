import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getRuntimeEnvReport, readEnv, resolveEstimateRecipient, resolveSiteUrl, summarizeEnvReport } from "../../../lib/runtime-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AttachmentSummary = {
  name: string;
  type: string;
  size: number;
};

type LeadContext = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: string;
  floorMeasurements: string;
  existingFloorCovering: string;
  concreteCondition: string;
  desiredFinish: string;
  desiredColor: string;
  preferredTimeline: string;
  timeline: string;
  asapServiceRequested: string;
  asapNotes: string;
  notes: string;
  source: string;
  campaign: string;
  notificationEmail: string;
  proposalWorkflow: string;
  attachments: AttachmentSummary[];
};

function requireText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function makeLeadId() {
  return `PEP-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function summarizeAttachments(formData: FormData) {
  return formData
    .getAll("attachments")
    .filter((item): item is File => item instanceof File && item.size > 0)
    .map((file) => ({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size
    }));
}

function buildLeadContext(formData: FormData, attachments: AttachmentSummary[]): LeadContext {
  const preferredTimeline = requireText(formData.get("preferredTimeline")) || "24-hour digital estimator request";
  const asapServiceRequested = requireText(formData.get("asapServiceRequested")) === "yes" ? "yes" : "no";

  return {
    fullName: requireText(formData.get("fullName")),
    address: requireText(formData.get("address")),
    email: requireText(formData.get("email")),
    phone: requireText(formData.get("phone")),
    zipCode: requireText(formData.get("zipCode")),
    projectType: requireText(formData.get("projectType")),
    floorMeasurements: requireText(formData.get("floorMeasurements")),
    existingFloorCovering: requireText(formData.get("existingFloorCovering")),
    concreteCondition: requireText(formData.get("concreteCondition")),
    desiredFinish: requireText(formData.get("desiredFinish")),
    desiredColor: requireText(formData.get("desiredColor")),
    preferredTimeline,
    timeline: asapServiceRequested === "yes" ? `ASAP service request - ${preferredTimeline}` : preferredTimeline,
    asapServiceRequested,
    asapNotes: requireText(formData.get("asapNotes")),
    notes: requireText(formData.get("notes")),
    source: requireText(formData.get("source")) || "xps_digital_estimator",
    campaign: requireText(formData.get("campaign")) || "15_percent_digital_estimator_coupon",
    notificationEmail: requireText(formData.get("notificationEmail")) || resolveEstimateRecipient(),
    proposalWorkflow: requireText(formData.get("proposalWorkflow")) || "Project review team reviews the estimate package, sends the proposal and warranty details by email, then sends payment and tracker follow-up after approval.",
    attachments
  };
}

async function persistLeadToSupabase(leadId: string, context: LeadContext, envReport = getRuntimeEnvReport()) {
  const supabaseUrl = readEnv("SUPABASE_URL");
  const supabaseKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    return {
      stored: false,
      mode: "queued" as const,
      provider: "local-receipt",
      reason: "Supabase env not configured. Lead accepted in degraded queue mode."
    };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Prefer": "return=minimal",
      "Content-Profile": "public",
      "Accept-Profile": "public"
    },
    body: JSON.stringify([
      {
        lead_id: leadId,
        source: context.source,
        campaign: context.campaign,
        status: context.asapServiceRequested === "yes" ? "priority_review" : "queued",
        owner: "Phoenix Epoxy Pros",
        meta_json: {
          leadId,
          fullName: context.fullName,
          address: context.address,
          email: context.email,
          phone: context.phone,
          zipCode: context.zipCode,
          projectType: context.projectType,
          floorMeasurements: context.floorMeasurements,
          existingFloorCovering: context.existingFloorCovering,
          concreteCondition: context.concreteCondition,
          desiredFinish: context.desiredFinish,
          desiredColor: context.desiredColor,
          preferredTimeline: context.preferredTimeline,
          timeline: context.timeline,
          asapServiceRequested: context.asapServiceRequested,
          asapNotes: context.asapNotes,
          notes: context.notes,
          notificationEmail: context.notificationEmail,
          proposalWorkflow: context.proposalWorkflow,
          attachments: context.attachments,
          envReport: summarizeEnvReport(envReport),
          createdAt: new Date().toISOString()
        }
      }
    ])
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase lead insert failed (${response.status}): ${body || response.statusText}`);
  }

  return {
    stored: true,
    mode: "live" as const,
    provider: "supabase-rest",
    reason: "Lead inserted into Supabase queue."
  };
}

async function sendResendEmail(leadId: string, context: LeadContext) {
  const resendKey = readEnv("RESEND_API_KEY");
  const from = readEnv("RESEND_FROM_EMAIL", readEnv("LEADS_FROM_EMAIL", "hello@phoenixepoxypros.com"));
  const recipient = context.notificationEmail || resolveEstimateRecipient();

  if (!resendKey || !from || !recipient) {
    return {
      sent: false,
      mode: "queued" as const,
      provider: "resend",
      to: recipient || resolveEstimateRecipient(),
      reason: "Resend env not configured. Email queued for later."
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `Phoenix Epoxy Pros <${from}>`,
      to: [recipient],
      subject: `New Phoenix Epoxy Pros digital bid: ${context.fullName || leadId}`,
      html: [
        `<h1>New digital bid received</h1>`,
        `<p><strong>Lead ID:</strong> ${leadId}</p>`,
        `<p><strong>Name:</strong> ${context.fullName}</p>`,
        `<p><strong>Email:</strong> ${context.email}</p>`,
        `<p><strong>Phone:</strong> ${context.phone}</p>`,
        `<p><strong>Project:</strong> ${context.projectType}</p>`,
        `<p><strong>Finish:</strong> ${context.desiredFinish} / ${context.desiredColor}</p>`,
        `<p><strong>Timeline:</strong> ${context.timeline}</p>`,
        `<p><strong>Attachments:</strong> ${context.attachments.length}</p>`,
        `<p><strong>Workflow:</strong> ${context.proposalWorkflow}</p>`
      ].join("")
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend email failed (${response.status}): ${body || response.statusText}`);
  }

  return {
    sent: true,
    mode: "live" as const,
    provider: "resend",
    to: recipient,
    reason: "Estimate email delivered."
  };
}

async function sendTwilioSms(leadId: string, context: LeadContext) {
  const accountSid = readEnv("TWILIO_ACCOUNT_SID");
  const authToken = readEnv("TWILIO_AUTH_TOKEN");
  const to = readEnv("TWILIO_OWNER_NOTIFY_TO");
  const messagingServiceSid = readEnv("TWILIO_MESSAGING_SERVICE_SID");
  const fromPhone = readEnv("TWILIO_FROM_PHONE_NUMBER");

  if (!accountSid || !authToken || !to || (!messagingServiceSid && !fromPhone)) {
    return {
      sent: false,
      mode: "queued" as const,
      provider: "twilio",
      to: to || "",
      reason: "Twilio env not configured. SMS queued for later."
    };
  }

  const body = [
    `Phoenix Epoxy Pros lead ${leadId}`,
    context.fullName,
    context.projectType,
    context.phone,
    context.timeline
  ].filter(Boolean).join(" | ");

  const payload = new URLSearchParams({
    To: to,
    Body: body
  });

  if (messagingServiceSid) {
    payload.set("MessagingServiceSid", messagingServiceSid);
  } else if (fromPhone) {
    payload.set("From", fromPhone);
  }

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: payload
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Twilio SMS failed (${response.status}): ${body || response.statusText}`);
  }

  return {
    sent: true,
    mode: "live" as const,
    provider: "twilio",
    to,
    reason: "Owner alert text delivered."
  };
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
  }

  const formData = await request.formData();
  const attachments = summarizeAttachments(formData);
  const context = buildLeadContext(formData, attachments);
  const leadId = makeLeadId();
  const envReport = getRuntimeEnvReport();

  if (!context.fullName || !context.email || !context.phone || !context.zipCode || !context.projectType) {
    return NextResponse.json(
      { ok: false, message: "Missing required lead fields.", leadId, envReport: summarizeEnvReport(envReport) },
      { status: 400 }
    );
  }

  const persistence = await persistLeadToSupabase(leadId, context, envReport).catch((error) => ({
    stored: false,
    mode: "queued" as const,
    provider: "supabase-rest",
    reason: error instanceof Error ? error.message : "Supabase lead queue failed."
  }));

  const notification = await sendResendEmail(leadId, context).catch((error) => ({
    sent: false,
    mode: "queued" as const,
    provider: "resend",
    to: context.notificationEmail,
    reason: error instanceof Error ? error.message : "Email queue failed."
  }));

  const sms = await sendTwilioSms(leadId, context).catch((error) => ({
    sent: false,
    mode: "queued" as const,
    provider: "twilio",
    to: readEnv("TWILIO_OWNER_NOTIFY_TO"),
    reason: error instanceof Error ? error.message : "SMS queue failed."
  }));

  return NextResponse.json({
    ok: true,
    leadId,
    score: context.asapServiceRequested === "yes" ? "high" : "new",
    receipt: persistence.stored ? "Lead queued in durable storage." : "Lead accepted in degraded queue mode.",
    envReport: summarizeEnvReport(envReport),
    leadPackage: {
      leadId,
      source: context.source,
      campaign: context.campaign,
      fullName: context.fullName,
      email: context.email,
      phone: context.phone,
      zipCode: context.zipCode,
      address: context.address,
      projectType: context.projectType,
      floorMeasurements: context.floorMeasurements,
      existingFloorCovering: context.existingFloorCovering,
      concreteCondition: context.concreteCondition,
      desiredFinish: context.desiredFinish,
      desiredColor: context.desiredColor,
      preferredTimeline: context.preferredTimeline,
      timeline: context.timeline,
      asapServiceRequested: context.asapServiceRequested,
      asapNotes: context.asapNotes,
      notes: context.notes,
      attachments: context.attachments,
      proposalWorkflow: context.proposalWorkflow,
      submittedAt: new Date().toISOString()
    },
    persistence,
    notification,
    sms,
    siteUrl: resolveSiteUrl()
  });
}
