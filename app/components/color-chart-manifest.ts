export type ColorChartBoard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  active: boolean;
  source: "xps-parent" | "city-override";
  maxResolution: string;
};

/**
 * Canonical color chart manifest synchronized with the Xtreme Polishing Systems parent-company catalog.
 * Add or remove chart families here first, then regenerate dependent UI, proposal, and city-clone outputs.
 */
export const colorChartBoards: ColorChartBoard[] = [
  {
    id: "flake",
    title: "Top Flake Colors",
    subtitle: "Full-broadcast flake finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774",
    alt: "XPS top 12 epoxy flake color chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  },
  {
    id: "metallic",
    title: "Top Metallic Colors",
    subtitle: "Decorative metallic epoxy finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766",
    alt: "XPS top metallic colors chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  },
  {
    id: "quartz",
    title: "Top Quartz Colors",
    subtitle: "Quartz texture finish options.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-quartz-colors-standardized.png?v=1781670783",
    alt: "XPS top quartz colors chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  },
  {
    id: "solid",
    title: "Solid Color Epoxy Base Coats",
    subtitle: "Solid color epoxy is typically used as the base coat during the application process.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330",
    alt: "XPS solid color epoxy base coat chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  },
  {
    id: "glitter",
    title: "Top Glitter Additive Colors",
    subtitle: "Glitter is an additive, but it can also be used to create an overall sparkle look.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-glitter-additive-colors.png?v=1781680348",
    alt: "XPS top glitter additive color chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  },
  {
    id: "stain",
    title: "Concrete Dye & Stain Colors",
    subtitle: "Concrete dye and stain options for polished or decorative concrete color direction.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-concrete-dye-stain-colors.png?v=1781680338",
    alt: "XPS concrete dye and stain color chart",
    active: true,
    source: "xps-parent",
    maxResolution: "3000x3000"
  }
];

export function getActiveColorChartBoards() {
  return colorChartBoards.filter((board) => board.active);
}
