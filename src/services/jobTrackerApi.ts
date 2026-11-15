import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  ApiResponse,
  ApplicationItem,
  ApplicationsResponseData,
  CreateApplicationPayload,
  JobFilterParams,
  JobFiltersData,
  JobStatsData,
  RecentActivityItem,
  UpcomingInterviewItem,
  UpdateApplicationPayload,
} from "../pages/JobTracker/types";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { clearAuth, getAccessToken, setAccessToken } from "@/utils/authMethods";
import {
  onMutationStartedDefault,
  onQueryStartedDefault,
} from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

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

export const jobTrackerApi = createApi({
  reducerPath: "jobTrackerApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Applications",
    "JobStats",
    "UpcomingInterviews",
    "RecentActivity",
    "JobFilters",
  ],

  endpoints: (builder) => ({
    getApplications: builder.query<
      ApiResponse<ApplicationsResponseData>,
      JobFilterParams | void
    >({
      query: (params) => ({
        url: "/api/job-tracker",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Applications"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getApplicationStats: builder.query<ApiResponse<JobStatsData>, void>({
      query: () => ({
        url: "/api/job-tracker/stats",
        method: "GET",
      }),
      providesTags: ["JobStats"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getUpcomingInterviews: builder.query<
      ApiResponse<UpcomingInterviewItem[]>,
      void
    >({
      query: () => ({
        url: "/api/job-tracker/upcoming-interviews",
        method: "GET",
      }),
      providesTags: ["UpcomingInterviews"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getRecentActivity: builder.query<ApiResponse<RecentActivityItem[]>, void>({
      query: () => ({
        url: "/api/job-tracker/recent-activity",
        method: "GET",
      }),
      providesTags: ["RecentActivity"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getFilterOptions: builder.query<ApiResponse<JobFiltersData>, void>({
      query: () => ({
        url: "/api/job-tracker/filters",
        method: "GET",
      }),
      providesTags: ["JobFilters"],
      onQueryStarted: onQueryStartedDefault,
    }),

    createApplication: builder.mutation<
      ApiResponse<ApplicationItem>,
      CreateApplicationPayload
    >({
      query: (body) => ({
        url: "/api/job-tracker",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Applications",
        "JobStats",
        "UpcomingInterviews",
        "RecentActivity",
      ],
      onQueryStarted: onMutationStartedDefault,
    }),

    getApplicationById: builder.query<ApiResponse<ApplicationItem>, string>({
      query: (id) => ({
        url: `/api/job-tracker/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Applications", id }],
      onQueryStarted: onQueryStartedDefault,
    }),

    updateApplication: builder.mutation<
      ApiResponse<ApplicationItem>,
      { id: string; body: UpdateApplicationPayload }
    >({
      query: ({ id, body }) => ({
        url: `/api/job-tracker/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        "Applications",
        "JobStats",
        "UpcomingInterviews",
        "RecentActivity",
      ],
      onQueryStarted: onMutationStartedDefault,
    }),

    updateApplicationStatus: builder.mutation<
      ApiResponse<ApplicationItem>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/job-tracker/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [
        "Applications",
        "JobStats",
        "UpcomingInterviews",
        "RecentActivity",
      ],
      onQueryStarted: onMutationStartedDefault,
    }),

    deleteApplication: builder.mutation<ApiResponse<unknown>, string>({
      query: (id) => ({
        url: `/api/job-tracker/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Applications",
        "JobStats",
        "UpcomingInterviews",
        "RecentActivity",
      ],
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationStatsQuery,
  useGetUpcomingInterviewsQuery,
  useGetRecentActivityQuery,
  useGetFilterOptionsQuery,
  useCreateApplicationMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = jobTrackerApi;