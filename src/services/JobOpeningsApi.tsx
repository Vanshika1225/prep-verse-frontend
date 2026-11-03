import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  ApiResponse,
  ApplyJobResponse,
  ConfirmApplyPayload,
  ConfirmApplyResponse,
  JobFiltersData,
  JobItem,
  JobsResponseData,
  PendingApplicationItem,
  PopularSkillItem,
  TopCompanyItem,
} from "../pages/JobOpenings/types";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { clearAuth, getAccessToken, setAccessToken } from "@/utils/authMethods";
import {
  onMutationStartedDefault,
  onQueryStartedDefault,
} from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

type QueryParams = Record<string, string | number | boolean | undefined>;

interface RefreshTokenResponse {
  data: {
    accessToken: string;
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

export const jobOpeningsApi = createApi({
  reducerPath: "jobOpeningsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Jobs",
    "JobDetails",
    "RecommendedJobs",
    "TopCompanies",
    "PopularSkills",
    "JobFilters",
    "PendingApplications",
  ],

  endpoints: (builder) => ({
    getJobs: builder.query<ApiResponse<JobsResponseData>, QueryParams | void>({
      query: (params) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params ?? {}).filter(
            ([_, v]) => v !== undefined && v !== "",
          ),
        );
        return {
          url: "/api/job-openings",
          method: "GET",
          params: cleanParams,
        };
      },
      providesTags: ["Jobs"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getJobById: builder.query<ApiResponse<JobItem>, string>({
      query: (id) => ({
        url: `/api/job-openings/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "JobDetails", id }],
      onQueryStarted: onQueryStartedDefault,
    }),

    getRecommendedJobs: builder.query<ApiResponse<JobItem[]>, void>({
      query: () => ({
        url: "/api/job-openings/recommended",
        method: "GET",
      }),
      providesTags: ["RecommendedJobs"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getTopCompanies: builder.query<ApiResponse<TopCompanyItem[]>, void>({
      query: () => ({
        url: "/api/job-openings/top-companies",
        method: "GET",
      }),
      providesTags: ["TopCompanies"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getPopularSkills: builder.query<ApiResponse<PopularSkillItem[]>, void>({
      query: () => ({
        url: "/api/job-openings/popular-skills",
        method: "GET",
      }),
      providesTags: ["PopularSkills"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getFilters: builder.query<ApiResponse<JobFiltersData>, void>({
      query: () => ({
        url: "/api/job-openings/filters",
        method: "GET",
      }),
      providesTags: ["JobFilters"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getPendingApplications: builder.query<
      ApiResponse<PendingApplicationItem[]>,
      void
    >({
      query: () => ({
        url: "/api/job-openings/pending-applications",
        method: "GET",
      }),
      providesTags: ["PendingApplications"],
      onQueryStarted: onQueryStartedDefault,
    }),

    applyJob: builder.mutation<ApiResponse<ApplyJobResponse>, string>({
      query: (jobId) => ({
        url: `/api/job-openings/${jobId}/apply`,
        method: "POST",
      }),
      invalidatesTags: ["Jobs", "PendingApplications"],
      onQueryStarted: onMutationStartedDefault,
    }),

    confirmApply: builder.mutation<
      ApiResponse<ConfirmApplyResponse>,
      { jobId: string; body: ConfirmApplyPayload }
    >({
      query: ({ jobId, body }) => ({
        url: `/api/job-openings/${jobId}/confirm-apply`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs", "PendingApplications"],
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetRecommendedJobsQuery,
  useGetTopCompaniesQuery,
  useGetPopularSkillsQuery,
  useGetFiltersQuery,
  useGetPendingApplicationsQuery,
  useApplyJobMutation,
  useConfirmApplyMutation,
} = jobOpeningsApi;
