# Auto Builder Runbook

## Objective

Generate the first Phoenix Epoxy Pros sandbox website and separate customer job operations app using the Nashville Resin Worx pattern, while allowing placeholders for owner assets and production credentials.

## Source Of Truth

- Repo: `Strategic-Minds/xtreme-epoxy`
- Reference repo: `Strategic-Minds/NASHVILLERESINWORX`
- Phoenix Drive packet: `001_PHOENIX_EPOXY_PROS`
- Readiness sheet: `Phoenix Epoxy Pros - Pre-Generation Readiness Checklist`
- Full scaffold package: `xtreme-epoxy-phoenix-full-scaffold.zip`
- Website path after package materialization: `apps/phoenix-epoxy-pros-site`
- Job app path after package materialization: `apps/phoenix-job-ops-app`

## Build Mode

Use `FACTORY_TEMPLATE_MODE=true` until owner approval and live integrations are complete.

Do not block sandbox generation on:

- final logo
- final images
- live payment keys
- live calendar ID
- live CRM webhook
- live SMS/email provider
- final domain and DNS

Block production launch on those same items.

## Required Auto Builder Steps

1. Read `factory/bootstrap/scaffold-package.json`.
2. Fetch the scaffold package from Drive.
3. Verify the package SHA-256.
4. Materialize the package into the repo workspace.
5. Validate `factory/auto-builder/phoenix-autonomous-build-packet.json`.
6. Generate a Vercel sandbox preview for `apps/phoenix-epoxy-pros-site`.
7. Generate a separate Vercel sandbox preview for `apps/phoenix-job-ops-app`.
8. Run the root validation script.
9. Run app PWA validation.
10. Run responsive and upload-flow checks.
11. Save receipts to the Phoenix Drive QA/approval folder.
12. Send owner review links and checklist status.

## 5-Minute Cron

The website app includes:

- route: `/api/cron/factory-readiness`
- schedule: `*/5 * * * *`
- purpose: readiness and receipt monitoring

Set `CRON_SECRET` in production and pass it as `?secret=...` if the deployment environment requires a protected cron request.

## Expected Receipts

- repo commit SHA
- scaffold package SHA verification
- Vercel preview URL for website
- Vercel preview URL for job app
- PWA manifest validation
- service worker validation
- placeholder asset validation
- lead form API response
- job app API response
- owner approval checklist status
