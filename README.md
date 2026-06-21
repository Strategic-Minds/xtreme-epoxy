# PHO0NIX-EPOXY-PROS

Autonomous DIGITAL BID, DIGITAL PORTAL,DIGITAL JOB TRACKER, FLOOR VISUALIZER LEAD GENERATION FUNNEL OPERATING ALL IN ONE OPERAING SYSTEMS

The first location is Phoenix Epoxy Pros. The scaffold is based on xps website reference pattern and now includes the production-readiness layer for integrations, pricing, Supabase, legal templates, receipt tracking, location registry, Metricool operations, Twilio SMS lead alerts, and QA.

--UPDATE-  I WOULD LIKE TO USE THE XPSWEBSITE VB1 AS INSPIRATION FOR THIS PHOENIX EPOXY PROS SYSTEM WITH SAME BRANDING -  

## Current Default Inputs

- Business name: Phoenix Epoxy Pros
- Phone: 772-209-0266
- Email: info@epoxywillchangeyourlife.com
- System sync email- strategicmindsadvisory@gmail.com
- Logo: placeholder- need to create a branch pack
- Images: https://drive.google.com/drive/folders/1zClFghVXNmY-QeU9NhzMTWvfD9VMV1HW?usp=drive_link
- Reference repo: https://drive.google.com/drive/folders/1SFRjoMbAVdank3Xl2OCTk5Qk2UnuGaIu?usp=drive_link
- Phoenix Drive packet: https://drive.google.com/drive/folders/1wdvro-T90CqXjcLtyACFXnlJ9vOqxuTk
- Readiness checklist: https://docs.google.com/spreadsheets/d/1WbzhWAbXYBXXBlqn7GsgKcfkPvl0gHcbwSt3VyOHiK4
- Production-ready scaffold package: https://drive.google.com/file/d/1uzNsNoK18ynpJXPtAiKnz-UG8fwCry9E/view?usp=drivesdk

- PARENT COMPANY -  XTREMEPOLISHINGSYSTEMS.COM

- PRIMARY INDUSTRY- EPOXY MANUFACTUING, DISTRIBUTION, TRAINING, INSTALLATION, WITH OVER 70 LOCATIONS.   PHOENIX EPOXY PROS WILL BE THE FIRST ITE OF OVER 70 SITES NATION WIDE AND BE THE TEMPLATE FOR THE WEBSITE FACTORY.   THE OBJECTIVE IS TO IMPLIMENT THE ABSOLUTE HIGHEST AND MOST ADVANCE AI TECHNOLOGY COMBINED WITH GOOGLE SEO STRATEGIC TECHNOLOGY IN ORDER TO HAVE RAPID WARP SPEED ORGANIC GROWTH BY PIGGY BACKING XTREME POLISHING SYSTEMS IN ORDER TO BECOME A LEAD GENERATION DIGITAL INDUSTRY LEADER IN AI ADVANCE CONSTRUCTION WORKFLOW AND OPERATING SYSTEMS TO LEAD THE WAY IN AI ENHANCE  CONTRUCTION OPERATING SYSTEMS.  BY GOAL IS TO MAKE PHOENIX THE LEADER IN THIS OPERATING SYSTEM TECHNOLOGY. 

- BENCHMARK GOALS
- https://floor-wiz.com- USE THE REFACTORING WORKBOOK, AND BENCHMARKING WORKBOOK IN ORDER TO ANALYZE AND REVERSE ENGINEER THE FLOOR WIX SITE AND SYSTEM IN ORDER TO BENCHMARK AND UPGRADE TO CREATE OUR OWN FLOOR AI ENHANCE FLOOR VISUALIZER.   
- DOMINOS WORKFLOW
- SAFELITE WORKFLOW
- END TO END DIGITAL SEAMLESS AND TRACKIED USER EXPERIENCED THAT SEEKS TO EVOLVE TRADITIONAL MANUIAL CONTRUCTION WORKFLOW FROM MANUAL HUMAN INTERACTION TO A FULLY AI ADVANCED CUSTOMER INTAKE WITH CUSTOMER JOB SITE ATACHMENT AND UPLOAD SYSTEM WITH DREAM FLOOR UPLOAD SYSTEM WITH AI ANALYHSIS, AND FULLY AUTONOMOMOUS AI TAKE OFF, BIDDING, SCHEDULING, TRACKING, COMMUNICATION SUSTEM, DIGITAL BIDDINGM DIGITAAL SIGNATURE, JOB TRACKING SYSTEM FOR THE CUSTOMER, THE OWNER, ADMIN, CREW LEADER WITH DIGITAL COLOR APPROVAL SYSTEM, DIGITAL CUSTOMER CHANGE ORDER SYTENM , INSITE PHOO SYSEM, AN AI TAKE OFF AND PROPOSAL SYSTEM, A DIGITAL CUSTOMER REVIEW  AND REFERAL SYSTEM, AND A GOOGLE WORK FLOW SYSTEM

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

- repository: `Strategic-Minds/phonix-epoxy-pros`
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
