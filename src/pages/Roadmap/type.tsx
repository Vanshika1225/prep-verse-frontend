export type MilestoneState = "Completed" | "Current" | "Locked";
export type RoadmapStatus = "In Progress" | "Not Started" | "Completed";
export type RoadmapDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Milestone {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  estimatedHours: number;
  state?: MilestoneState;
  dueDate?: string | null;
  completedAt?: string | null;
}

export interface RoadmapItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: RoadmapDifficulty;
  topics?: string[] | null;
  status: RoadmapStatus;
  totalMilestones: number;
  completedMilestones: number;
  progress: number;
  estimatedHours: number;
  hoursPerWeek?: number | null;
  startedAt?: string | null;
  completedAt?: string | null;
  milestones: Milestone[];
}

export interface OverallProgressData {
  overallPercentage: number;
  roadmapsInProgress: number;
  completedMilestones: number;
  totalMilestones: number;
  totalRoadmaps: number;
  totalTimeInvested: {
    hours: number;
    minutes: number;
    display: string;
  };
}

export interface RecommendedRoadmap {
  _id?: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  topics?: string[] | null;
  hoursPerWeek?: number | null;
  usersCount?: number;
  bookmarked?: boolean;
  milestones?: {
    title: string;
    description: string;
    estimatedHours: number;
  }[];
}

export interface UpcomingMilestone {
  milestoneId: string;
  title: string;
  description: string;
  roadmapId: string;
  roadmapTitle: string;
  dueDate: string;
  isOverdue: boolean;
  estimatedHours: number;
}

export interface CreateMilestoneInput {
  title: string;
  description: string;
  estimatedHours: number;
}

export interface CreateRoadmapPayload {
  title: string;
  description: string;
  category: string;
  difficulty: RoadmapDifficulty;
  topics: string[];
  hoursPerWeek: number;
  milestones: CreateMilestoneInput[];
}

export interface UpdateMilestonePayload {
  status: "Completed" | "In Progress" | "Locked";
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}