import type { ColorChartBoard } from "./color-chart-manifest";

export type CityColorChartOverride = {
  city: string;
  boards: Partial<Record<string, Partial<ColorChartBoard>>>;
};

/**
 * Optional city-specific overrides. Keep the parent-company catalog as the default.
 * Add new city overrides here only when local market assets need replacement.
 */
export const cityColorChartOverrides: CityColorChartOverride[] = [];

export function resolveColorChartBoards(baseBoards: ColorChartBoard[], city?: string) {
  const override = city ? cityColorChartOverrides.find((item) => item.city.toLowerCase() === city.toLowerCase()) : undefined;

  if (!override) {
    return baseBoards;
  }

  return baseBoards.map((board) => ({
    ...board,
    ...(override.boards[board.id] || {})
  }));
}
