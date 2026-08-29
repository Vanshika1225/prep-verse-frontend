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
