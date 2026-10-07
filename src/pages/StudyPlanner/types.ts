export type PlanColor = "primary" | "success" | "warning" | "info";

export interface StudyPlan {
  id: string;
  name: string;
  dateRange: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  subtitle?: string;
  start: string;
  end: string;
  type: "dsa" | "system" | "web" | "revision" | "other";
}

export type PlanningStyle = "daily" | "weekly" | "monthly";

export type Track =
  | "frontend"
  | "fullstack"
  | "devops"
  | "dsa"
  | "system-design"
  | "custom";

export interface CreatePlanData {
  name: string;
  duration: number;
  planningStyle: PlanningStyle;
  track: Track;
  stack?: string;
  subjects: string[];
  days: string[];
  startTime: string;
  endTime: string;
}
