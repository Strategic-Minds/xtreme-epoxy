# XPS Website Operating Plan

Last updated: June 19, 2026
Project: `xtreme-epoxy`
Repo: `Strategic-Minds/xtreme-epoxy`
Drive source folder: `XPS WEBSITES`
Connection account: `strategicmindsadvisory@gmail.com`
Current validated preview: `https://xtreme-epoxy.vercel.app`

## Operating Intent

Keep the existing Phoenix Epoxy Pros/XPS branding intact while turning the website into a complete customer workflow:

1. A visitor starts a Digital Bid from the hero, the customer portal entry, or the 15% Digital Estimator section.
2. The Digital Bid System collects the full project package: contact details, address, measurements, existing covering, concrete condition, finish, color, urgency, notes, and multiple images.
3. The submission is queued in Supabase and, once mail credentials are configured, emailed to `jeremy@shopxps.com` for human review.
4. The customer lands on a client dashboard showing their selected finish, selected color, coupon, ASAP status, image count, delivery status, and next workflow step.
5. Jeremy sends the proposal, warranty information, and payment link by email.
6. After payment, the customer receives temporary job tracker access.
7. The long-term portal target is email-first access, preferably Supabase magic link/OTP, so customers do not need to remember a username and password.

## Current Status

### Built In The Branch

- Branded home page with white phone icon, no floor visualizer, color charts directly on the page, job tracker promo, and 15% estimator section.
- Hero form that starts the Digital Bid path and prefills the estimator page.
- `/customer-portal` temporary no-password intake for full name, email, phone, ZIP, and ASAP request.
- `/digital-estimator` professional intake page with white fields, required project details, multiple image uploads, finish/color logic, ASAP request, and proposal workflow copy.
- `/client-dashboard` interactive client dashboard with selected finish/color, coupon, upload summary, delivery status, workflow tracker, action checklist, and instant chat access.
- `/job-tracker` temporary tracker preview for the post-proposal/payment/access workflow.
- `/api/leads` route that now succeeds only when either Supabase queueing or email notification succeeds.

### Validated On June 19, 2026

- Vercel preview deployment `dpl_8yemUXmhPtwiTwzCLMTKPFF41SK4` built successfully from commit `881c541c46fd2a436dea7fe4035e545fcdfd6bbc`.
- Vercel fetch returned HTTP 200 for `/`, `/digital-estimator`, `/client-dashboard`, and `/customer-portal` on the current preview.
- Supabase project `prhppuuwcnmfdhwsagug` is active.
- `public.leads` exists and supports the estimator payload through `meta_json`.
- `media-assets` exists, is private, and allows PNG, JPG, and WEBP files up to the configured bucket limit.
- Insert-only RLS policy is installed for XPS intake sources on `public.leads`.
- Insert-only storage policy is installed for `media-assets/xps-digital-estimator/*`.
- Public lead reading remains blocked.
- The API was patched to generate the lead ID before insert and use `Prefer: return=minimal`, avoiding the unsafe need for an anonymous SELECT policy.
- A controlled public-intake Supabase insert succeeded with finish, color, coupon, dashboard path, ASAP status, and metadata. The validation row was removed after confirmation.
- Supabase security advisor only flagged unrelated Auth leaked-password protection.

## Customer Workflow

### 1. Entry

Customers enter through one simple estimate path:

- Hero quote form: name, email, phone, ZIP, project type, optional ASAP request, then prefilled Digital Bid page.
- Homepage 15% estimator section: same Digital Bid route.
- Temporary customer portal: no password; collect basics and route to Digital Bid.

### 2. Digital Bid System

The Digital Bid System collects:

- Full name
- Address
- Email
- Phone number
- ZIP code
- Project type
- Floor measurements
- Existing floor: bare concrete, paint, laminate, tile, VCT, peeling epoxy, carpet
- Concrete condition: new, fair/some cracks, bad/cracks and holes
- Desired floor finish
- Desired color tied to desired finish, including natural options for polished/sealed concrete
- Preferred timeline
- ASAP service request and ASAP notes
- Project notes
- Multiple current floor photos and inspiration screenshots from the XPS site or anywhere online

Customer promise: 15% Digital Estimator coupon, estimate within 24 hours by email, warranty information, proposal path, and job tracker access after payment.

### 3. Client Dashboard

After submit, the client dashboard should show:

- Customer contact summary
- Submitted date/time
- Project type and address
- Measurements, existing floor, concrete condition, desired finish, desired color
- ASAP status and notes
- Uploaded image count and image names available in the browser session
- 15% coupon status
- Delivery/queue status
- Workflow steps: Digital Bid Submitted, Estimator Review, Proposal + Warranty Email, Payment Link, Job Tracker Access
- Client action checklist
- Instant chat access that carries project context

### 4. Review, Proposal, Payment, Tracker

The MVP remains human-reviewed:

- The website receives the submission.
- Attachments are stored in Supabase Storage when valid PNG/JPG/WEBP images are uploaded.
- A lead row is inserted into `public.leads`.
- Email notification is sent to `jeremy@shopxps.com` when Resend is configured.
- Jeremy reviews the package and sends the proposal by email.
- The customer receives warranty information and a payment link after proposal approval.
- After payment, the customer receives temporary job tracker access.

## Backend And Data Plan

### Supabase

`public.leads` is the MVP queue. The flexible `meta_json` payload keeps the system moving until the full XPS job schema is ready.

Current queue fields used by the app:

- `lead_id`
- `source`
- `campaign`
- `status`
- `owner`
- `meta_json`

Current RLS posture:

- XPS public intake can insert only approved website/chat/estimator sources with bounded payload fields.
- Storage uploads are insert-only into `media-assets/xps-digital-estimator/*`.
- Public read remains blocked.
- Existing authenticated lead read policy should be reviewed before a full customer/staff portal launch.

### API Contract

`/api/leads` now follows this production-safe contract:

- Attempts Supabase image storage for eligible image uploads.
- Attempts Supabase lead persistence.
- Attempts Resend email notification.
- Returns success only when at least one durable path works.
- Returns a clear failure message if neither queueing nor email works.
- Does not require anonymous SELECT on the lead table.

## Email Delivery Plan

Email is the remaining live gate.

Required Vercel runtime variables:

- `RESEND_API_KEY`
- `LEADS_FROM_EMAIL` or `RESEND_FROM_EMAIL`
- `XPS_ESTIMATE_RECIPIENT`, defaulting to `jeremy@shopxps.com`

The Vercel connector available in this run exposes project/log inspection but not environment-variable listing or editing. The app code is ready for Resend, but final email delivery cannot be certified until the Resend key and allowed sender are configured in Vercel and a real POST test confirms delivery to `jeremy@shopxps.com`.

## Auth Plan

### Current Blocker

Supabase Auth password login previously failed with:

`500: Database error querying schema`

The temporary portal intentionally avoids password login for now. Auth repair remains separate from the public Digital Bid workflow.

### Temporary Model

- Collect full name, email, phone, ZIP, and optional ASAP request.
- Prefill the Digital Bid page.
- Route estimate/proposal/payment through email.
- Send temporary job tracker access after payment.

### Target Model

- Supabase passwordless magic link/OTP using `signInWithOtp`.
- Configure allowed Site URL and redirect URLs in Supabase.
- Store customers/jobs against verified email.
- Let customers enter an email, receive a secure link, and open the tracker without a reusable password.

## Implementation Rules

Do not change the approved brand system unless owner-approved:

- Keep black/white/gold industrial visual identity.
- Keep Phoenix Epoxy Pros branding on the current pilot site.
- Keep professional white Digital Bid form fields.
- Keep color charts available directly on the home page.
- Keep the floor visualizer removed until explicitly reapproved.
- Keep the phone icon white.

## Production Readiness Gates

Ready now:

- Frontend workflow on preview.
- Supabase public intake queueing.
- Private lead inserts without anonymous read.
- Client dashboard shell and workflow state.
- Temporary portal path without password friction.

Still gated before final production claim:

- Configure and verify Resend delivery in Vercel.
- Run a real browser POST with a small PNG/JPG/WEBP attachment after a Browser/Playwright worker or equivalent test path is available.
- Confirm notification reaches `jeremy@shopxps.com`.
- Merge/promote the validated branch to production.
- Repair Supabase Auth before replacing the temporary portal with email-link tracker access.

## Validation Checklist

Before production promotion:

- Home page loads and no floor visualizer route/link is visible.
- Hero form routes to `/digital-estimator` with prefilled details.
- Homepage 15% estimator routes to the same Digital Bid page.
- `/customer-portal` temporary intake routes to Digital Bid.
- `/digital-estimator` accepts required fields and multiple image uploads.
- `/api/leads` queues into Supabase without anonymous lead SELECT.
- Resend email reaches `jeremy@shopxps.com`.
- `/client-dashboard` shows the submitted package, finish, color, measurements, condition, upload summary, ASAP status, coupon, and workflow steps.
- Instant chat opens from the dashboard and carries project context.
- `/job-tracker` communicates the complete post-estimate workflow.
- Supabase Auth password failure is not exposed to customers.
- Production deployment is promoted only after the email test passes.

## Next Actions

1. Add/verify `RESEND_API_KEY` and sender variables in Vercel.
2. Run a real Digital Bid POST test with one small image.
3. Confirm the lead row appears in `public.leads` and the notification arrives at `jeremy@shopxps.com`.
4. Promote or merge the branch after email validation.
5. Repair Supabase Auth and replace temporary customer entry with email magic-link tracker access.
