import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const approvedPages = [
  "/",
  "/digital-estimator",
  "/digital-bid",
  "/client-dashboard",
  "/admin-dashboard",
  "/portal-system",
  "/job-tracker"
];

const approvedAssets = [
  "/images/hero-garage-approved.webp",
  "/images/before-after-approved.webp",
  "/images/services-strip-approved.webp",
  "/images/logo-header.webp",
  "/images/logo-panel.webp"
];

function isTruthy(value: unknown) {
  return value === "1" || value === "true" || value === "yes";
}

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  const expectedSecret = process.env.CRON_SECRET || "";

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: "Unauthorized cron request." }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";
  const checks = [] as Array<{ path: string; ok: boolean; status?: number; note?: string }>;

  for (const path of approvedPages) {
    try {
      const response = await fetch(new URL(path, siteUrl), { cache: "no-store" });
      checks.push({ path, ok: response.ok, status: response.status, note: response.ok ? "page ok" : "page failed" });
    } catch (error) {
      checks.push({ path, ok: false, note: error instanceof Error ? error.message : "request failed" });
    }
  }

  const assetChecks = await Promise.all(approvedAssets.map(async (path) => {
    try {
      const response = await fetch(new URL(path, siteUrl), { cache: "no-store" });
      return { path, ok: response.ok, status: response.status };
    } catch {
      return { path, ok: false };
    }
  }));

  const failures = [...checks.filter((item) => !item.ok), ...assetChecks.filter((item) => !item.ok)];
  const nextActions = failures.length === 0
    ? [
        "Keep the current build locked.",
        "Record this success receipt in Drive.",
        "Run the next scheduled validation cycle."
      ]
    : [
        "Review the failing pages and assets listed in the receipt.",
        "Open the matching repo files and repair the drift.",
        "Re-run validation before any production promotion."
      ];
  const result = {
    ok: failures.length === 0,
    timestamp: new Date().toISOString(),
    mode: isTruthy(process.env.FACTORY_TEMPLATE_MODE) ? "template" : "production",
    pagesChecked: checks,
    assetsChecked: assetChecks,
    failures,
    nextActions,
    receipt: failures.length === 0 ? "Factory readiness validated." : "Factory readiness found issues and needs review."
  };

  return NextResponse.json(result, { status: failures.length === 0 ? 200 : 207 });
}
