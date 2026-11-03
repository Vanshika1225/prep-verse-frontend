import type { ReactNode } from "react";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type WorkMode = "On-site" | "Hybrid" | "Remote" | "Work From Home";
export type JobType = "Full Time" | "Part Time" | "Internship" | "Contract";

export interface JobExperience {
  min: number | null;
  display: string;
}

export interface JobSalary {
  min: number | null;
  max: number | null;
  currency: string;
  display: string;
}

export interface JobItem {
  _id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  publisher?: string;
  experience: JobExperience;
  salary: JobSalary;
  description: string;
  requirements?: string[];
  skills: string[];
  openings: number;
  applicationsCount: number;
  isNew?: boolean;
  isApplied?: boolean;
  isSaved?: boolean;
  postedAt: string;
}

export interface JobPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
}

export interface JobsResponseData {
  jobs: JobItem[];
  pagination: JobPagination;
}

export interface TopCompanyItem {
  company: string;
  companyLogo: string;
  openings: number;
}

export interface PopularSkillItem {
  name: string;
  count: number;
}

export interface FilterSortOption {
  value: string;
  label: string;
}

export interface JobFiltersData {
  locations: string[];
  companies: string[];
  experience: string[];
  jobTypes: string[];
  workModes: string[];
  sortOptions: FilterSortOption[];
}

export interface PendingApplicationItem {
  jobId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  clickedAt: string;
}

export interface ApplyJobResponse {
  jobId: string;
  applyUrl: string;
  status: "Pending" | "Applied";
}

export interface ConfirmApplyPayload {
  applied: boolean;
}

export interface ConfirmApplyResponse {
  applicationId: string;
  jobId: string;
  applied: boolean;
  status: string;
  appliedAt: string;
}

export interface JobFilterState {
  search: string;
  location: string;
  experience: string;
  jobType: string;
  workMode: string;
  quickFilter: string;
  sort: string;
  skill?: string;
  company?: string;
  page: number;
  limit: number;
}

export const defaultJobFilters: JobFilterState = {
  search: "",
  location: "",
  experience: "",
  jobType: "",
  workMode: "",
  quickFilter: "",
  sort: "recent",
  skill: "",
  company: "",
  page: 1,
  limit: 10,
};

export interface QuickFilterOption {
  id: string;
  label: string;
  field: "workMode" | "jobType" | "experience";
  value: string;
  icon?: ReactNode;
}

export interface ApplyConfirmModalProps {
  open: boolean;
  job: JobItem | null;
  applyUrl?: string;
  isConfirming: boolean;
  onClose: () => void;
  onConfirmApplied: () => void;
}

export interface JobFilterBarProps {
  filters: JobFilterState;
  filterOptions?: JobFiltersData;
  onChange: (updated: Partial<JobFilterState>) => void;
  onClear: () => void;
}

export interface JobListProps {
  jobs: JobItem[];
  pagination?: JobPagination;
  sort: string;
  isLoading: boolean;
  onSortChange: (sort: string) => void;
  onPageChange: (page: number) => void;
  onApply: (job: JobItem) => void;
}

export interface JobSidebarProps {
  recommendedJobs: JobItem[];
  topCompanies: TopCompanyItem[];
  popularSkills: PopularSkillItem[];
  selectedSkill?: string;
  onSelectSkill: (skill: string) => void;
  onSelectCompany: (company: string) => void;
  onSelectJob: (job: JobItem) => void;
  onGoToTracker?: () => void;
}

export interface JobCardProps {
  job: JobItem;
  onApply: (job: JobItem) => void;
}

export interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PopularSkillsCardProps {
  skills: PopularSkillItem[];
  selectedSkill?: string;
  onSelectSkill: (skill: string) => void;
}

export interface RecommendedJobsCardProps {
  jobs: JobItem[];
  onSelectJob?: (job: JobItem) => void;
}

export interface TopCompaniesCardProps {
  companies: TopCompanyItem[];
  onSelectCompany?: (name: string) => void;
}
