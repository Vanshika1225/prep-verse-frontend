export const TABS = [
  "All Problems",
  "Bookmarked",
  "Solved",
  "Attempted",
  "To Revise",
];

export const TOPIC_OPTIONS = [
  { value: "all", label: "All" },
  { value: "array", label: "Array" },
  { value: "hash-table", label: "Hash Table" },
  { value: "linked-list", label: "Linked List" },
  { value: "tree", label: "Tree" },
];

export const DIFFICULTY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Solved", label: "Solved" },
  { value: "Attempted", label: "Attempted" },
  { value: "Not Solved", label: "Not Solved" },
  { value: "To Revise", label: "To Revise" },
];

export type ProblemStatus = "Solved" | "Attempted" | "Not Solved" | "To Revise";

export interface Problem {
  id: number;
  title: string;
  starred: boolean;
  tags: string[];
  top150: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  time: string;
  status: ProblemStatus;
  action: string;
}
