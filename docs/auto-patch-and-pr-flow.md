# Auto Patch And PR Flow

This workflow converts a failing readiness receipt into a durable repo handoff.

## Trigger Sources

- Vercel cron readiness failures
- Manual GitHub Actions dispatch
- Local validation failures during repo work

## Flow

1. Read the latest readiness receipt.
2. Extract failing paths, status codes, and notes.
3. Group failures into a small set of actionable categories.
4. Write a patch-plan summary with the most likely fix target files.
5. Open a GitHub issue with the receipt and the patch plan.
6. If the fix is deterministic and low-risk, prepare a PR-ready branch change set.
7. Re-run validation after the patch lands.

## Current Safety Rule

The automation can draft the handoff and create the issue, but it does not apply unreviewed code changes in production.

## Suggested Fix Categories

- Missing or broken route
- Broken asset reference
- PWA manifest drift
- Chart manifest drift
- Navigation or CTA drift
- Metadata or SEO drift
- Runtime/API regression

## Receipt Standard

Every failure receipt should include:

- timestamp
- ok / failed status
- failing paths
- HTTP status or error note
- next actions
- owning doc or folder reference

