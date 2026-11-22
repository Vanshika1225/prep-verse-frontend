import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  ApiResponse,
  DashboardSummary,
  DisciplineScore,
  WeeklyActivity,
} from "@/pages/Dashboard/types";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import { onQueryStartedDefault } from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

interface RefreshTokenResponse {
  data: { accessToken: string };
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  activeToday: boolean;
  lastActiveDate: string | null;
  todaySolved: number;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) return result;

  const refreshResult = await rawBaseQuery(
    { url: "/api/auth/refresh-token", method: "POST" },
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

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getDashboardSummary: builder.query<ApiResponse<DashboardSummary>, void>({
      query: () => ({ url: "/api/dashboard/summary", method: "GET" }),
      onQueryStarted: onQueryStartedDefault,
    }),

    getDisciplineScore: builder.query<ApiResponse<DisciplineScore>, void>({
      query: () => ({ url: "/api/dashboard/discipline-score", method: "GET" }),
      onQueryStarted: onQueryStartedDefault,
    }),

    getWeeklyActivity: builder.query<
      ApiResponse<WeeklyActivity>,
      { range: "week" | "month" }
    >({
      query: (params) => ({
        url: "/api/dashboard/weekly-activity",
        method: "GET",
        params,
      }),
      onQueryStarted: onQueryStartedDefault,
    }),

    getStreak: builder.query<ApiResponse<StreakData>, void>({
      query: () => ({ url: "/api/users/streak", method: "GET" }),
      onQueryStarted: onQueryStartedDefault,
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetDisciplineScoreQuery,
  useGetWeeklyActivityQuery,
  useGetStreakQuery,
} = dashboardApi;
