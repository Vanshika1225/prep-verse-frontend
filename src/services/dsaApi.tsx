import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Problem } from "@/pages/DSAPractice/ProblemList/types";
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

export const dsaApi = createApi({
  reducerPath: "dsaApi",

  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

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
  }),
});

export const {
  useGetAllProblemsQuery,
  useUpdateProblemMutation,
  useGetAllProblemOverviewCountQuery,
  useGetAllProblemrecentProblemsQuery,
  useLazyGetAllProblemTopicBreakdownQuery,
} = dsaApi;
