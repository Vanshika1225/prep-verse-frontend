export const CHART_COLORS = [
  "#6C4CF1",
  "#4C7CF1",
  "#38BFA7",
  "#F5A64A",
  "#E8759A",
  "#5B8DEF",
  "#8B72D9",
  "#45B7A3",
  "#F07C5D",
  "#9B9BDB",
];

export const getChartColor = (index: number, colors = CHART_COLORS) => {
  return colors[index % colors.length];
};
