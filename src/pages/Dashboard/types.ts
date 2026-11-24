import type { ReactNode } from "react";

export interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export interface LinkTextProps {
  label: string;
  onClick: () => void;
}

export interface ListSkeletonProps {
  rows?: number;
  height?: number;
}

export interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export interface JobCardItem {
  _id: string;
  title: string;
  company: any;
  location?: any;
  skills?: string[];
  experience?: any;
  salary?: any;
  postedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface DashboardStat {
  key: string;
  label: string;
  value: string;
  delta: string;
  trend: number[]; 
}

export interface DashboardUser {
  name: string;
  streak: number;
}

export interface DashboardSummary {
  user: DashboardUser;
  stats: DashboardStat[];
}

export interface DisciplineScore {
  score: number; 
  message: string;
  changeFromLastWeek: number;
}

export interface WeeklyActivity {
  days: string[]; 
  slots: string[];
  levels: number[][]; 
}

export interface ProgressItem {
  key: string;
  label: string;
  value: string;
  delta: string;
}

export interface Recommendation {
  _id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
}

export interface AddTaskRequest {
  title: string;
  topic: string;
  scheduledDate: string;
}
