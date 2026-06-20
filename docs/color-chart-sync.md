# Color Chart Sync

The Phoenix Epoxy Pros site uses the Xtreme Polishing Systems parent-company chart families as the canonical source.

## Canonical Families
- Top Flake Colors
- Top Metallic Colors
- Top Quartz Colors
- Solid Color Epoxy Base Coats
- Top Glitter Additive Colors
- Concrete Dye & Stain Colors

## Sync Rule
If the parent company adds or removes a chart family:
1. Update `app/components/color-chart-manifest.ts`
2. Update the Drive manifest in the canonical color chart folder
3. Regenerate any dependent pages, visualizer labels, and proposal content
4. Revalidate the homepage and digital bid flow

## Add/Remove Fields
- `id`
- `title`
- `subtitle`
- `image`
- `alt`
- `active`

## Goal
Keep one reusable chart source so the homepage, visualizer, bid flow, and city-clone packages stay synchronized with the parent-company chart catalog.
