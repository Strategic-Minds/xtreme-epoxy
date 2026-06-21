export type EnvMode = "live" | "queued" | "stub" | "disabled";

export type EnvEntry = {
  name: string;
  purpose: string;
  fallbackMode: EnvMode;
  productionCritical?: boolean;
  defaultValue?: string;
};

export type EnvStatusEntry = EnvEntry & {
  present: boolean;
  value: string;
};

export type RuntimeEnvReport = {
  siteUrl: string;
  estimateRecipient: string;
  envs: EnvStatusEntry[];
  missing: string[];
  productionBlockers: string[];
  degradedFeatures: string[];
};

const envCatalog: EnvEntry[] = [
  {
    name: "NEXT_PUBLIC_SITE_URL",
    purpose: "Local and deployed base URL for cron and browser validation receipts.",
    fallbackMode: "live",
    defaultValue: "http://127.0.0.1:3000"
  },
  {
    name: "CRON_SECRET",
    purpose: "Protects the readiness cron when the environment is production.",
    fallbackMode: "stub",
    productionCritical: true
  },
  {
    name: "ESTIMATE_RECIPIENT_EMAIL",
    purpose: "Primary estimate review inbox for the owner or ops team.",
    fallbackMode: "queued",
    defaultValue: "hello@phoenixepoxypros.com"
  },
  {
    name: "LEADS_FROM_EMAIL",
    purpose: "Verified sender identity for estimate and receipt email delivery.",
    fallbackMode: "queued",
    defaultValue: "hello@phoenixepoxypros.com"
  },
  {
    name: "SUPABASE_URL",
    purpose: "Durable intake queue and metadata storage.",
    fallbackMode: "queued"
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    purpose: "Server-side write access for lead storage.",
    fallbackMode: "queued"
  },
  {
    name: "SUPABASE_STORAGE_BUCKET",
    purpose: "Attachment storage bucket for job photos.",
    fallbackMode: "queued",
    defaultValue: "media-assets"
  },
  {
    name: "RESEND_API_KEY",
    purpose: "Proposal and estimate email delivery.",
    fallbackMode: "queued"
  },
  {
    name: "RESEND_FROM_EMAIL",
    purpose: "Verified Resend sender address.",
    fallbackMode: "queued",
    defaultValue: "hello@phoenixepoxypros.com"
  },
  {
    name: "TWILIO_ACCOUNT_SID",
    purpose: "SMS owner alert delivery.",
    fallbackMode: "queued"
  },
  {
    name: "TWILIO_AUTH_TOKEN",
    purpose: "SMS owner alert delivery.",
    fallbackMode: "queued"
  },
  {
    name: "TWILIO_MESSAGING_SERVICE_SID",
    purpose: "Preferred Twilio messaging service.",
    fallbackMode: "queued"
  },
  {
    name: "TWILIO_FROM_PHONE_NUMBER",
    purpose: "Alternate Twilio sender when a messaging service is not used.",
    fallbackMode: "queued"
  },
  {
    name: "TWILIO_OWNER_NOTIFY_TO",
    purpose: "Owner notification number for lead alerts.",
    fallbackMode: "queued"
  },
  {
    name: "PLAYWRIGHT_BASE_URL",
    purpose: "Browser validation base URL when running against a live deployment.",
    fallbackMode: "live",
    defaultValue: "http://127.0.0.1:3000"
  },
  {
    name: "PLAYWRIGHT_WEB_SERVER_COMMAND",
    purpose: "Override browser validation server command when needed.",
    fallbackMode: "stub"
  }
];

export function readEnv(name: string, fallback = "") {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

export function resolveSiteUrl() {
  return readEnv("NEXT_PUBLIC_SITE_URL", "http://127.0.0.1:3000");
}

export function resolveEstimateRecipient() {
  return readEnv("ESTIMATE_RECIPIENT_EMAIL", readEnv("LEADS_FROM_EMAIL", "hello@phoenixepoxypros.com"));
}

export function getRuntimeEnvReport(): RuntimeEnvReport {
  const envs = envCatalog.map((entry) => {
    const value = readEnv(entry.name, entry.defaultValue || "");
    return {
      ...entry,
      present: value.length > 0,
      value
    };
  });

  const missing = envs.filter((item) => !item.present).map((item) => item.name);
  const productionBlockers = envs
    .filter((item) => item.productionCritical && !item.present && process.env.NODE_ENV === "production")
    .map((item) => item.name);
  const degradedFeatures = envs
    .filter((item) => !item.present)
    .map((item) => `${item.name} -> ${item.fallbackMode}`);

  return {
    siteUrl: resolveSiteUrl(),
    estimateRecipient: resolveEstimateRecipient(),
    envs,
    missing,
    productionBlockers,
    degradedFeatures
  };
}

export function summarizeEnvReport(report: RuntimeEnvReport) {
  return {
    siteUrl: report.siteUrl,
    estimateRecipient: report.estimateRecipient,
    missing: report.missing,
    productionBlockers: report.productionBlockers,
    degradedFeatures: report.degradedFeatures
  };
}
