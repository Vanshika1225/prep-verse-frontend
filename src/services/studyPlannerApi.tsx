import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import {
  onMutationStartedDefault,
  onQueryStartedDefault,
} from "@/utils/serviceUtility";

export interface StudyPlan {
  _id: string;
  userId: string;
  name: string;
  duration: string;
  organizationType: string;
  learningTrack: string;
  specializations: string[];
  availableDays: string[];
  availableFrom: string;
  availableUntil: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;

  totalTasks: number;
  completedTasks: number;
  remaining: number;
  completion: number;
}

export interface StudyTask {
  _id: string;
  planId:
    | string
    | {
        _id: string;
        name: string;
      };
  userId: string;
  title: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  topic: string;
  status: "Pending" | "Completed";
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateStudyPlanRequest {
  name: string;
  duration: string;
  organizationType: string;
  learningTrack: string;
  specializations: string[];
  availableDays: string[];
  availableFrom: string;
  availableUntil: string;
}

interface CreateStudyPlanResponse {
  plan: StudyPlan;
  totalTasksGenerated: number;
}

export interface UpdateStudyPlanRequest {
  id: string;
  data: Partial<
    Pick<
      StudyPlan,
      | "name"
      | "duration"
      | "organizationType"
      | "learningTrack"
      | "specializations"
      | "availableDays"
      | "availableFrom"
      | "availableUntil"
    >
  >;
}

interface WeeklyScheduleDay {
  date: string;
  dayName: string;
  tasks: StudyTask[];
}

export interface WeeklyScheduleResponse {
  weekStart: string;
  weekEnd: string;
  schedule: Record<string, WeeklyScheduleDay>;
}

export interface StudyPlannerStats {
  weeklyProgress: {
    percentage: number;
    completed: number;
    total: number;
  };

  studyHours: {
    hours: number;
    minutes: number;
    display: string;
  };

  tasksCompleted: {
    count: number;
    vsLastWeek: number;
  };
}

export interface UpdateTaskStatusRequest {
  id: string;
  status: "Pending" | "Completed";
}

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: "/api/auth/refresh-token",
      method: "POST",
    },
    api,
    extraOptions,
  );

  if (refreshResult.data) {
    const { accessToken } = (refreshResult.data as RefreshTokenResponse).data;

    setAccessToken(accessToken);

    return rawBaseQuery(args, api, extraOptions);
  }

  clearAuth();
  api.dispatch(logoutAction());
  window.location.href = "/login";

  return result;
};

export const studyPlannerApi = createApi({
  reducerPath: "studyPlannerApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["studyPlans", "studyTasks", "studyPlannerStats"],

  endpoints: (builder) => ({
    getStudyPlans: builder.query<ApiResponse<StudyPlan[]>, void>({
      query: () => ({
        url: "/api/study-planner",
        method: "GET",
      }),
      providesTags: ["studyPlans"],
      onQueryStarted: onQueryStartedDefault,
    }),

    createStudyPlan: builder.mutation<
      ApiResponse<CreateStudyPlanResponse>,
      CreateStudyPlanRequest
    >({
      query: (data) => ({
        url: "/api/study-planner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["studyPlans", "studyPlannerStats", "studyTasks"],
      onQueryStarted: onMutationStartedDefault,
    }),
    getWeeklySchedule: builder.query<
      ApiResponse<WeeklyScheduleResponse>,
      { weekStart?: string } | void
    >({
      query: (params) => ({
        url: "/api/study-planner/schedule",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["studyTasks"],
      onQueryStarted: onQueryStartedDefault,
    }),
    getStudyPlannerStats: builder.query<ApiResponse<StudyPlannerStats>, void>({
      query: () => ({
        url: "/api/study-planner/stats",
        method: "GET",
      }),
      providesTags: ["studyPlannerStats"],
      onQueryStarted: onQueryStartedDefault,
    }),
    getTodayFocus: builder.query<ApiResponse<StudyTask[]>, void>({
      query: () => ({
        url: "/api/study-planner/today-focus",
        method: "GET",
      }),
      providesTags: ["studyTasks"],
      onQueryStarted: onQueryStartedDefault,
    }),
    updateTaskStatus: builder.mutation<
      ApiResponse<StudyTask>,
      UpdateTaskStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/api/study-planner/tasks/${id}`,
        method: "POST",
        body: {
          status,
        },
      }),
      invalidatesTags: ["studyTasks", "studyPlannerStats", "studyPlans"],
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useGetStudyPlansQuery,
  useCreateStudyPlanMutation,
  useGetWeeklyScheduleQuery,
  useGetStudyPlannerStatsQuery,
  useGetTodayFocusQuery,
  useUpdateTaskStatusMutation,
} = studyPlannerApi;
