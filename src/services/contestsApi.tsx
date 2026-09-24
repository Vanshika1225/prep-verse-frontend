import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import { onQueryStartedDefault } from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

export interface Contest {
  _id: string;
  platform: "Codeforces" | "CodeChef" | "LeetCode";
  externalId: string;
  name: string;
  type: string | null;
  phase: string | null;
  duration: number;
  startTime: string;
  endTime: string;
  url: string;
  registrationUrl: string | null;

  // new (optional, shown in the redesigned row)
  badge?: "Official" | "Rated";
  problems?: number;
  level?: string; // "Mixed" | "Easy - Medium" | "Medium - Hard"
  participants?: number;
}

interface UpcomingContestsResponse {
  success: boolean;
  count: number;
  contests: Contest[];
}

interface LiveContestsResponse {
  success: boolean;
  contests: Contest[];
}

interface CompletedContestsResponse {
  success: boolean;
  message: string;
  data: {
    contests: Contest[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface RecentContest {
  contestId: string;
  name: string;
  platform: string;
  rank: number | null;
  ratingBefore: number | null;
  ratingAfter: number | null;
  ratingChange: number | null;
  attendedAt: string;
  totalParticipants?: number | null; // new
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

    // new
    highestRatingDate?: string | null;
    globalRank?: number | null;
    globalRankChange?: number | null;
  };
  activity: { date: string; count: number }[];
  platformBreakdown: Record<string, number>;
  recentContests: RecentContest[];
}

interface ContestAnalyticsResponse {
  success: boolean;
  data: ContestAnalytics;
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}

interface SyncResponse {
  success: boolean;
  message: string;
  data: Record<
    string,
    {
      platform?: string;
      total?: number;
      synced?: number;
      error?: string;
    }
  >;
}

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

export const contestApi = createApi({
  reducerPath: "contestApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["contests"],

  endpoints: (builder) => ({
    getUpcomingContests: builder.query<UpcomingContestsResponse, void>({
      query: () => ({
        url: "/api/contests/upcoming",
        method: "GET",
      }),
      providesTags: ["contests"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getLiveContests: builder.query<LiveContestsResponse, void>({
      query: () => ({
        url: "/api/contests/live",
        method: "GET",
      }),
      providesTags: ["contests"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getCompletedContests: builder.query<
      CompletedContestsResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/api/contests/completed",
        method: "GET",
        params,
      }),
      providesTags: ["contests"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getContestAnalytics: builder.query<ContestAnalyticsResponse, void>({
      query: () => ({
        url: "/api/contests/analytics",
        method: "GET",
      }),
      providesTags: ["contests"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    syncAllContests: builder.mutation<SyncResponse, void>({
      query: () => ({
        url: "/api/contests/sync",
        method: "POST",
      }),
      invalidatesTags: ["contests"],
    }),

    syncUserContests: builder.mutation<SyncResponse, void>({
      query: () => ({
        url: "/api/contests/sync/user",
        method: "POST",
      }),
      invalidatesTags: ["contests"],
    }),
  }),
});

export const {
  useGetUpcomingContestsQuery,
  useGetLiveContestsQuery,
  useGetCompletedContestsQuery,
  useGetContestAnalyticsQuery,
  useSyncAllContestsMutation,
  useSyncUserContestsMutation,
} = contestApi;
