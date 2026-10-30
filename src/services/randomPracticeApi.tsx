import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  Difficulty,
  RandomProblemsRequest,
  RandomProblemsResponse,
} from "@/pages/DSAPractice/RandomPractice/types";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import { onQueryStartedDefault } from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

interface RefreshTokenResponse {
  data: {
    accessToken: string;
  };
}

export interface RandomProblem {
  problemId: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: string[];
  status: string;
  bookmarked: boolean;
  updatedAt?: string;
}

export interface RecentActivity {
  problemId: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topics: string[];
  status: string;
  bookmarked: boolean;
  updatedAt: string;
}

export interface RecentActivityResponse {
  succes: boolean;
  message: string;
  data: RecentActivity[];
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

export const randomPracticeApi = createApi({
  reducerPath: "randomPracticeApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    generateRandomProblems: builder.query<
      RandomProblemsResponse,
      RandomProblemsRequest
    >({
      query: (params) => ({
        url: "/api/problems/randomProblem",
        method: "GET",
        params,
      }),
    }),
    getRandomPracticeRecentActivity: builder.query<
      RecentActivityResponse,
      void
    >({
      query: () => ({
        url: "/api/problems/randomProblem/recent-activity",
        method: "GET",
      }),
      onQueryStarted: onQueryStartedDefault,
    }),
  }),
});

export const {
  useLazyGenerateRandomProblemsQuery,
  useGetRandomPracticeRecentActivityQuery,
} = randomPracticeApi;
