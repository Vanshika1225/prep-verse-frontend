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

export interface Pattern {
  key: string;
  name: string;
  count: number;
  solved: number;
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
  solved: number;
  percent: number;
  icon: React.ElementType;
  colorKey: ColorKey;
}

export type PatternMeta = Pick<Pattern, "key" | "name" | "icon" | "colorKey">;

export const PATTERNS: PatternMeta[] = [
  {
    key: "arrays",
    name: "Arrays",
    icon: TrendingUpRounded,
    colorKey: "success",
  },
  {
    key: "binary-search",
    name: "Binary Search",
    icon: ManageSearchRounded,
    colorKey: "primary",
  },
  {
    key: "sliding-window",
    name: "Sliding Window",
    icon: FilterFramesRounded,
    colorKey: "warning",
  },
  {
    key: "dp",
    name: "Dynamic Programming",
    icon: GridViewRounded,
    colorKey: "secondary",
  },
  {
    key: "graphs",
    name: "Graphs",
    icon: HubRounded,
    colorKey: "error",
  },
  {
    key: "trees",
    name: "Trees",
    icon: ParkRounded,
    colorKey: "success",
  },
  {
    key: "stack-queue",
    name: "Stack & Queue",
    icon: StorageRounded,
    colorKey: "warning",
  },
  {
    key: "two-pointers",
    name: "Two Pointers",
    icon: CodeRounded,
    colorKey: "secondary",
  },
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
