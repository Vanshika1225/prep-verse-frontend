import {
  TrendingUpRounded,
  ManageSearchRounded,
  FilterFramesRounded,
  GridViewRounded,
  HubRounded,
  ParkRounded,
  StorageRounded,
  CodeRounded,
  ShuffleRounded,
  DescriptionRounded,
  WorkspacePremiumRounded,
} from "@mui/icons-material";
import type { Theme } from "@mui/material";

export type ColorKey =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export interface Pattern {
  key: string;
  name: string;
  count: number;
  percent: number;
  icon: React.ElementType;
  colorKey: ColorKey;
}

export const getColorSet = (theme: Theme, key: ColorKey) => ({
  color: theme.palette[key].main,
  bg:
    key === "primary" || key === "secondary"
      ? `${theme.palette[key].main}14`
      : theme.palette[key].light,
});

export const PATTERNS: Pattern[] = [
  {
    key: "arrays",
    name: "Arrays",
    count: 162,
    percent: 70,
    icon: TrendingUpRounded,
    colorKey: "success",
  },
  {
    key: "binary-search",
    name: "Binary Search",
    count: 98,
    percent: 60,
    icon: ManageSearchRounded,
    colorKey: "primary",
  },
  {
    key: "sliding-window",
    name: "Sliding Window",
    count: 87,
    percent: 45,
    icon: FilterFramesRounded,
    colorKey: "warning",
  },
  {
    key: "dp",
    name: "Dynamic Programming",
    count: 187,
    percent: 55,
    icon: GridViewRounded,
    colorKey: "secondary",
  },
  {
    key: "graphs",
    name: "Graphs",
    count: 123,
    percent: 40,
    icon: HubRounded,
    colorKey: "error",
  },
  {
    key: "trees",
    name: "Trees",
    count: 147,
    percent: 65,
    icon: ParkRounded,
    colorKey: "success",
  },
  {
    key: "stack-queue",
    name: "Stack & Queue",
    count: 73,
    percent: 50,
    icon: StorageRounded,
    colorKey: "warning",
  },
  {
    key: "two-pointers",
    name: "Two Pointers",
    count: 112,
    percent: 60,
    icon: CodeRounded,
    colorKey: "secondary",
  },
];

export const FILTER_TABS = [
  "Array",
  "String",
  "Dynamic Programming",
  "Graph",
  "Tree",
  "Binary Search",
  "Two Pointers",
  "Stack",
];

export const DIFFICULTY_BREAKDOWN: {
  label: string;
  count: number;
  percent: number;
  colorKey: ColorKey;
}[] = [
  { label: "Easy", count: 65, percent: 40, colorKey: "success" },
  { label: "Medium", count: 70, percent: 43, colorKey: "warning" },
  { label: "Hard", count: 27, percent: 17, colorKey: "error" },
];

export const LEARN_ITEMS = [
  "Array Traversal",
  "Two Dimensional Arrays",
  "Sliding Window on Arrays",
  "Prefix Sum / Suffix Sum",
  "Kadane's Algorithm",
  "Array Manipulation",
];

export const RECOMMENDED = [
  {
    title: "Two Pointers",
    subtitle: "Based on your progress",
    icon: CodeRounded,
  },
  {
    title: "Prefix Sum",
    subtitle: "Often asked with Arrays",
    icon: TrendingUpRounded,
  },
  {
    title: "Matrix",
    subtitle: "Level up your array skills",
    icon: GridViewRounded,
  },
];

export const QUICK_ACTIONS = [
  {
    title: "Random Practice",
    subtitle: "Practice random questions",
    icon: ShuffleRounded,
  },
  {
    title: "Mock Test",
    subtitle: "Test your preparation",
    icon: DescriptionRounded,
  },
  {
    title: "Contest",
    subtitle: "Join coding contests",
    icon: WorkspacePremiumRounded,
  },
];

export const OVERALL_SOLVED = 756;
export const OVERALL_TOTAL = 1200;
