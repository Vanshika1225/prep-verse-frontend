import type { ElementType } from "react";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type JobStatusKey =
  | "applied"
  | "oa"
  | "interview"
  | "offer"
  | "rejected";

export type JobStatusLabel =
  | "Applied"
  | "OA / Assessment"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface JobSalary {
  min: number | null;
  max: number | null;
  currency: string;
}

export interface ApplicationItem {
  _id: string;
  company: string;
  companyLogo?: string;
  role: string;
  category: string;
  location: string;
  workMode: "On-site" | "Hybrid" | "Remote" | string;
  status: JobStatusLabel;
  tag: string;
  stageSubtitle: string;
  appliedDate?: string | null;
  oaDueDate?: string | null;
  oaLink?: string;
  interviewDate?: string | null;
  interviewRound?: string;
  interviewTime?: string;
  offerDate?: string | null;
  offeredSalary?: number | null;
  rejectedDate?: string | null;
  rejectionReason?: string;
  salary?: JobSalary;
  jobUrl?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ColumnData {
  title: string;
  count: number;
  items: ApplicationItem[];
}

export interface ApplicationsResponseData {
  totalApplications: number;
  columns: {
    applied: ColumnData;
    oa: ColumnData;
    interview: ColumnData;
    offer: ColumnData;
    rejected: ColumnData;
  };
  applications: ApplicationItem[];
}

export interface ProgressBreakdownItem {
  status: string;
  count: number;
  percentage: number;
}

export interface JobStatsData {
  overview: {
    totalApplications: number;
    interviews: number;
    offers: number;
    rejections: number;
  };
  progress: {
    total: number;
    breakdown: ProgressBreakdownItem[];
  };
}

export interface RecentActivityItem {
  _id: string;
  userId: string;
  applicationId: string;
  title: string;
  role: string;
  company: string;
  companyLogo?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface UpcomingInterviewItem {
  _id: string;
  company: string;
  companyLogo?: string;
  role: string;
  round: string;
  interviewDate: string;
  interviewTime?: string;
  displayDate: string;
}

export interface JobFiltersData {
  categories: string[];
  locations: string[];
  statuses: string[];
}

export interface JobFilterParams {
  category?: string;
  location?: string;
  status?: string;
  search?: string;
}

export interface CreateApplicationPayload {
  company: string;
  role: string;
  status: string;
  category?: string;
  location?: string;
  workMode?: string;
  notes?: string;
  jobUrl?: string;
  oaDueDate?: string | null;
  oaLink?: string;
  interviewDate?: string | null;
  interviewRound?: string;
  interviewTime?: string;
  offerDate?: string | null;
  offeredSalary?: number | null;
  rejectedDate?: string | null;
  rejectionReason?: string;
  salary?: JobSalary;
}

export type UpdateApplicationPayload = Partial<CreateApplicationPayload>;

export interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: ApplicationItem | null;
  defaultStatus?: string;
}

export interface StatusConfig {
  key: string;
  label: string;
  icon: ElementType;
  color: string;
  bg: string;
}

export const COMMON_INTERVIEW_ROUNDS = [
  "Screening",
  "Technical Round 1",
  "Technical Round 2",
  "Technical Round 3",
  "System Design",
  "HR / Managerial",
  "Bar Raiser",
];

export const OA_PLATFORMS = [
  "HackerRank",
  "LeetCode",
  "CodeSignal",
  "Codility",
];

export const REJECTION_REASONS = [
  "Experience Mismatch",
  "Position Closed",
  "Failed OA",
  "Failed Interview",
  "Ghosted",
];

export interface DeleteConfirmModalProps {
  open: boolean;
  applicationTitle: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface FilterBarProps {
  filters: JobFilterParams;
  onFilterChange: (filters: JobFilterParams) => void;
}

export interface HeaderSectionProps {
  onAddNew: () => void;
}

export const ALL_STATUSES = [
  "Applied",
  "OA / Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export interface JobCardProps {
  item: ApplicationItem;
  onEdit: (item: ApplicationItem) => void;
  onDelete: (item: ApplicationItem) => void;
  onUpdateStatus: (item: ApplicationItem, newStatus: string) => void;
}

export interface KanbanBoardProps {
  columns?: ApplicationsResponseData["columns"];
  isLoading: boolean;
  onAddNew: (status: string) => void;
  onEdit: (item: ApplicationItem) => void;
  onDelete: (item: ApplicationItem) => void;
  onUpdateStatus: (item: ApplicationItem, newStatus: string) => void;
}

export interface ColumnConfig {
  key: JobStatusKey;
  title: string;
  defaultStatus: string;
  icon: ElementType;
  iconColor: string;
  iconBg: string;
}

export interface KanbanColumnProps {
  title: string;
  defaultStatus: string;
  count: number;
  items: ApplicationItem[];
  icon: ElementType;
  iconColor: string;
  iconBg: string;
  isLoading: boolean;
  onAddNew: () => void;
  onEdit: (item: ApplicationItem) => void;
  onDelete: (item: ApplicationItem) => void;
  onUpdateStatus: (item: ApplicationItem, newStatus: string) => void;
}