import type { ReactNode } from "react";

export type ContestPlatform = "LeetCode" | "Codeforces" | "CodeChef";

export interface Contest {
  _id: string;
  name: string;
  platform: ContestPlatform;
  externalId: string;
  duration: number;
  startTime: string;
  endTime: string;
  registrationUrl?: string;
  url: string;
  type?: string;
  phase?: string;
  badge?: "Official" | "Rated";
  problems?: number;
  level?: string;
  participants?: number;
  ratingAfter: number | null;
  ratingBefore: number | null;
  rank: number | null;
  attendedAt: string;
  ratingChange: number | null;
  contestId: number | null;
}

export interface ContestAnalytics {
  performance: {
    participated: number;
    won: number;
    top10Finishes: number;
    winRate: number;
  };
  ratings: {
    contestRating: number | null;
    highestRating: number | null;
    latestRatingChange: number | null;
    highestRatingDate?: string | null;
    globalRank?: number | null;
    globalRankChange?: number | null;
  };

  activity: {
    date: string;
    count: number;
  }[];

  platformBreakdown: {
    LeetCode: number;
    Codeforces: number;
    CodeChef: number;
  };

  recentContests: {
    contestId: string;
    name: string;
    platform: ContestPlatform;
    rank: number | null;
    ratingBefore: number | null;
    ratingAfter: number | null;
    ratingChange: number | null;
    attendedAt: string;
    totalParticipants?: number | null;
  }[];
}

export interface ContestFilterState {
  search: string;
  platform: string;
  level: string;
  duration: "" | "short" | "medium" | "long";
}

export const defaultContestFilters: ContestFilterState = {
  search: "",
  platform: "",
  level: "",
  duration: "",
};

export interface RatingCardProps {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: ReactNode;
  footer?: ReactNode;
  inline?: boolean;
  fullWidth?: boolean;
}

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DURATIONS: {
  label: string;
  value: ContestFilterState["duration"];
}[] = [
  { label: "All", value: "" },
  { label: "Under 1 Hour", value: "short" },
  { label: "1-2 Hours", value: "medium" },
  { label: "2+ Hours", value: "long" },
];

export const PLATFORMS = ["All", "LeetCode", "Codeforces", "CodeChef"];

export interface upcommingContest {
  open: boolean;
  onClose: () => void;
  contests: Contest[];
  filters: ContestFilterState;
  onFiltersChange: (next: ContestFilterState) => void;
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onSelectContest?: (contest: Contest) => void;
  title: string;
}
