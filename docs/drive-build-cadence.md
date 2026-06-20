# Drive Build Cadence

This document defines the 5-minute validation and build cadence that keeps the repo aligned with the Drive source of truth.

## Source Inputs

- Drive master operating summary
- Chart manifest and chart file IDs
- Visualizer governance and benchmark docs
- SEO bridge and keyword/source maps
- Competitor intelligence bridge
- Industry intelligence bridge
- Auto-build workbook and scaffold pack
- Customer, crew, admin, and owner dashboard specs

## 5-Minute Readiness Loop

1. Validate the homepage, digital estimator, digital bid, and dashboard routes.
2. Validate approved image assets.
3. Validate the PWA manifest and core metadata.
4. Validate the chart manifest and visualizer assets.
5. Record the result as a receipt.
6. If failures exist, open a review task or fallback note.

## Build Gate Rules

- Build only from approved Drive docs.
- Keep the chart manifest file-backed.
- Keep SEO and competitor intelligence tied to the build cadence.
- Keep the repo aligned with `Strategic-Minds/xtreme-epoxy`.
- Keep Vercel workflow triggers limited to readiness and release gates.

## Operational Notes

- This cadence is intended to run every 5 minutes in Vercel cron.
- It does not mutate production content.
- It validates and reports. Production changes remain approval-gated.
