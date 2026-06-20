# xtreme-epoxy

Autonomous website factory starter for Xtreme Polishing Systems connected local market sites.

The first location is Phoenix Epoxy Pros. The scaffold is based on the Nashville Resin Worx reference pattern and now includes the production-readiness layer for integrations, pricing, Supabase, legal templates, receipt tracking, location registry, Metricool operations, Twilio SMS lead alerts, and QA.

## Current Default Inputs

- Business name: Phoenix Epoxy Pros
- Phone: 772-209-0266
- Email: hello@phoenixepoxypros.com
- Logo: placeholder
- Images: placeholder
- Reference repo: https://github.com/Strategic-Minds/NASHVILLERESINWORX
- Phoenix Drive packet: https://drive.google.com/drive/folders/1wdvro-T90CqXjcLtyACFXnlJ9vOqxuTk
- Readiness checklist: https://docs.google.com/spreadsheets/d/1WbzhWAbXYBXXBlqn7GsgKcfkPvl0gHcbwSt3VyOHiK4
- Production-ready scaffold package: https://drive.google.com/file/d/1uzNsNoK18ynpJXPtAiKnz-UG8fwCry9E/view?usp=drivesdk

## Production-Readiness Drive Artifacts

- Integration Matrix: https://docs.google.com/spreadsheets/d/1OlhBL3fZQ_6UBoj5ybnxvxF-RjFQG7ReShCMojZ20ww
- Pricing And AI Estimating Workbook: https://docs.google.com/spreadsheets/d/1FVqeSbU-xeHznz-zMWv3vnj48D5r3oP2bBYFZiibfu8
- Supabase Data Dictionary: https://docs.google.com/spreadsheets/d/1Tijw6ey7A1eM9QTEODNU80PjChzOua9-psHFueLNpBM
- Legal And Approval Template Pack: https://docs.google.com/document/d/1ermccPi0TB-BPZcEDBqmTFmdFmFPmxHNnG6pP2SJoX4
- Location Master Registry: https://docs.google.com/spreadsheets/d/1fkT28Mv8iArZZYN3TDiyEm3gkLLRysGxitpmItgfE4w
- Metricool Operating Inputs: https://docs.google.com/spreadsheets/d/1B03cw3VPrNK4fPSMXuR2jXQm54DA3QL4TJ66T8vFJiQ
- Automation Receipt Archive: https://drive.google.com/drive/folders/1Up7KoErt8neJIGq9Ooxv9xscJWaY_0AY

## Scaffold Contents

The production-ready scaffold package contains:

- `apps/phoenix-epoxy-pros-site`: public funnel website PWA with Twilio SMS lead alerts and opt-in customer confirmations
- `apps/phoenix-job-ops-app`: separate customer/company job operations PWA
- `packages/factory-config`: reusable location, brand, asset, and owner-input configuration
- `packages/backend-template`: backend records, estimating, timeline, and receipt template logic
- `supabase/migrations`: Supabase database schema with SMS consent/status lead fields
- `schemas`: automation receipt schema and event map
- `tests/e2e`: Playwright owner-preview tests
- `.github/workflows`: validation workflows
- `factory`: Auto Builder packets, manifests, location configs, and readiness checklists
- `docs`: builder, branding, backend, legal, receipt, and owner handoff documentation

## Twilio SMS Setup

Set these variables in Vercel or the approved Auto Builder vault before production launch:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID` or `TWILIO_FROM_PHONE_NUMBER`
- `TWILIO_OWNER_NOTIFY_TO`
- `TWILIO_ENABLE_CUSTOMER_SMS=true` after SMS consent language is approved
- `TWILIO_STATUS_CALLBACK_URL` if delivery callbacks are required

Do not store live Twilio credentials in Drive or Git.

## Auto Builder Handoff

Use this repo as the control repo and ingest the production-ready scaffold package after switching Auto Builder to:

- repository: `Strategic-Minds/xtreme-epoxy`
- first location: `phoenix-epoxy-pros`
- website app path: `apps/phoenix-epoxy-pros-site`
- customer app path: `apps/phoenix-job-ops-app`
- Drive folder: `001_PHOENIX_EPOXY_PROS`
- bootstrap manifest: `factory/bootstrap/scaffold-package.json`
- validation checklist: `factory/checklists/pre-generation-readiness.md`

## Local Validation After Materialization

```bash
npm run validate
```

This checks factory files, Supabase migration, receipt schema, PWA manifests, placeholder files, Twilio SMS wiring, and app-level validation scripts without requiring live integrations.

Full production builds require dependencies and environment variables from `.env.example`. Do not store live secrets in Drive or Git.
