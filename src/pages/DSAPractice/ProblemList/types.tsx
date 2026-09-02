export const TABS = [
  "All Problems",
  "Bookmarked",
  "Solved",
  "Attempted",
  "To Revise",
];

export type ProblemStatus = "Not Started" | "Attempted" | "Solved" | "Review";

export interface Problem {
  _id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  problemLink: string;
  status: string;
  bookmarked: boolean | undefined;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProblemOverviewCount {
  solved?: number;
  attempted?: number;
  bookmarked?: number;
  review?: number;
}

export interface ProblemOverviewResponse {
  data?: ProblemOverviewCount;
}

export interface TopicBreakdownItem {
  solved: number;
  topic: string;
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface RecentProblemItem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  bookmarked: boolean;
  status: string;
  updatedAt: string;
}
