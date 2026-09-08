import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { Problem } from "@/pages/DSAPractice/ProblemList/types";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import {
  onMutationStartedDefault,
  onQueryStartedDefault,
} from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

type QueryParams = Record<string, string | number | boolean>;

interface UpdateRequest<T = Record<string, unknown>> {
  id: string;
  data: T;
}

interface ProblemUpdateData {
  bookmarked: boolean;
  status: string;
}

interface ProblemUpdateResponse {
  success: boolean;
  message: string;
  data: unknown;
}

interface ProblemsApiResponse {
  data: {
    problems: Problem[];
    filters: {
      topics: string[];
      difficulties: string[];
      statuses: string[];
    };
    pagination: {
      totalProblems: number;
      currentPage: number;
      totalPages: number;
      limit: number;
    };
  };
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}

interface DifficultyOverviewResponse {
  success: boolean;
  data: {
    easy: number;
    medium: number;
    hard: number;
  };
}

interface PatternWiseResponse {
  success: boolean;
  data: {
    overall: {
      totalProblems: number;
      solvedProblems: number;
      progress: number;
    };
    patterns: {
      name: string;
      totalProblems: number;
      solvedProblems: number;
      progress: number;
    }[];
  };
}

export interface LearningOutcomeResponse {
  data: {
    learningPoints: string[];
  };
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

export const dsaApi = createApi({
  reducerPath: "dsaApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["problems"],

  endpoints: (builder) => ({
    getAllProblems: builder.query<ProblemsApiResponse, QueryParams>({
      query: (params) => ({
        url: "/api/problems",
        method: "GET",
        params,
      }),
      providesTags: ["problems"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    updateProblem: builder.mutation<
      ProblemUpdateResponse,
      UpdateRequest<ProblemUpdateData>
    >({
      query: ({ id, data }) => ({
        url: `/api/problems/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["problems"],
      onQueryStarted: onMutationStartedDefault,
    }),

    getAllProblemOverviewCount: builder.query<unknown, QueryParams>({
      query: (params) => ({
        url: "/api/problems/overview-count",
        method: "GET",
        params,
      }),
      providesTags: ["problems"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getAllProblemTopicBreakdown: builder.query<unknown, QueryParams>({
      query: (params) => ({
        url: "/api/problems/topic-wise-problem",
        method: "GET",
        params,
      }),
      providesTags: ["problems"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getAllProblemrecentProblems: builder.query<unknown, QueryParams>({
      query: (params) => ({
        url: "/api/problems/recent-problems",
        method: "GET",
        params,
      }),
      providesTags: ["problems"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getPatternWiseProblems: builder.query<PatternWiseResponse, void>({
      query: () => ({
        url: "/api/problems/patternwise",
        method: "GET",
      }),
      providesTags: ["problems"],
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getDifficultyOverview: builder.query<
      DifficultyOverviewResponse,
      { pattern: string }
    >({
      query: ({ pattern }) => ({
        url: `/api/problems/patternwise/${encodeURIComponent(pattern)}/difficulty`,
        method: "GET",
      }),
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getLearningOutcome: builder.query<
      LearningOutcomeResponse,
      { pattern: string }
    >({
      query: ({ pattern }) => ({
        url: `/api/problems/patternwise/${encodeURIComponent(pattern)}/learn`,
        method: "GET",
      }),
      onQueryStarted: onQueryStartedDefault as never,
    }),

    getRecommendedProblems: builder.query<unknown, { pattern: string }>({
      query: ({ pattern }) => ({
        url: `/api/problems/patternwise/${encodeURIComponent(pattern)}/recommended-questions-for-you`,
        method: "GET",
      }),
      onQueryStarted: onQueryStartedDefault as never,
    }),
  }),
});

export const {
  useGetAllProblemsQuery,
  useUpdateProblemMutation,
  useGetAllProblemOverviewCountQuery,
  useGetAllProblemrecentProblemsQuery,
  useGetAllProblemTopicBreakdownQuery,
  useGetPatternWiseProblemsQuery,
  useGetDifficultyOverviewQuery,
  useGetLearningOutcomeQuery,
  useGetRecommendedProblemsQuery,
} = dsaApi;
