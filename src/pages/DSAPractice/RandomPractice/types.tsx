export type Difficulty = "Easy" | "Medium" | "Hard";

export const DIFFICULTY_OPTIONS: Difficulty[] = ["Easy", "Medium", "Hard"];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20];

export const DAILY_GOAL = 10;

export interface RandomProblemsRequest {
  difficulty: Difficulty[];
  topics: string[];
  count: number;
  excludeSolved: boolean;
  bookmarkedOnly: boolean;
}

export interface RandomProblemItem {
  _id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: string[];
  problemLink: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  bookmarked?: boolean;
}

export interface RandomProblemsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    problems: RandomProblemItem[];
  };
}

export interface RecentActivityItem {
  problemId: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: string[];
  status: string;
  bookmarked: boolean;
  updatedAt: string;
}

export interface RecentActivityResponse {
  succes?: boolean;
  success?: boolean;
  message: string;
  data: RecentActivityItem[];
}

export interface RandomPracticeFilters {
  difficulty: Difficulty[];
  topics: string[];
  tags: string[];
  count: number;
  excludeSolved: boolean;
  bookmarkedOnly: boolean;
}

export const DEFAULT_FILTERS: RandomPracticeFilters = {
  difficulty: ["Medium"],
  topics: [],
  tags: [],
  count: 10,
  excludeSolved: false,
  bookmarkedOnly: false,
};

export interface RandomPracticeContextValue {
  filters: RandomPracticeFilters;
  problems: RandomProblemItem[];
  isGenerating: boolean;
  hasGenerated: boolean;
  isMixed: boolean;
  toggleDifficulty: (value: Difficulty) => void;
  selectMixed: () => void;
  setCount: (value: number) => void;
  setTopics: (value: string[]) => void;
setDifficulty: (value: Difficulty[]) => void;  setExcludeSolved: (value: boolean) => void;
  setBookmarkedOnly: (value: boolean) => void;
  resetFilters: () => void;
  generate: () => Promise<void>;
  clearSet: () => void;
}

export type Row = Omit<RandomProblemItem, "status" | "bookmarked"> & {
  id: string;
  serial: number;
  status: string;
  bookmarked: boolean;
};
