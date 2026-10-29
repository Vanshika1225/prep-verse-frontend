import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  ApiResponse,
  CreateRoadmapPayload,
  OverallProgressData,
  RecommendedRoadmap,
  RoadmapItem,
  UpcomingMilestone,
  UpdateMilestonePayload,
} from "../pages/Roadmap/type";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import {
  onMutationStartedDefault,
  onQueryStartedDefault,
} from "@/utils/serviceUtility";

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

type QueryParams = Record<string, string | number | boolean>;

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

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Roadmaps", "OverallProgress", "Recommended", "Upcoming"],

  endpoints: (builder) => ({
    getRoadmaps: builder.query<ApiResponse<RoadmapItem[]>, QueryParams | void>({
      query: (params) => ({
        url: "/api/roadmap",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Roadmaps"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getRoadmapById: builder.query<ApiResponse<RoadmapItem>, string>({
      query: (id) => ({
        url: `/api/roadmap/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Roadmaps", id }],
      onQueryStarted: onQueryStartedDefault,
    }),

    createRoadmap: builder.mutation<
      ApiResponse<RoadmapItem>,
      CreateRoadmapPayload
    >({
      query: (body) => ({
        url: "/api/roadmap",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roadmaps", "OverallProgress", "Upcoming"],
      onQueryStarted: onMutationStartedDefault,
    }),

    getOverallProgress: builder.query<ApiResponse<OverallProgressData>, void>({
      query: () => ({
        url: "/api/roadmap/overall-progress",
        method: "GET",
      }),
      providesTags: ["OverallProgress"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getRecommendedRoadmaps: builder.query<
      ApiResponse<RecommendedRoadmap[]>,
      void
    >({
      query: () => ({
        url: "/api/roadmap/recommended",
        method: "GET",
      }),
      providesTags: ["Recommended"],
      onQueryStarted: onQueryStartedDefault,
    }),

    getUpcomingMilestones: builder.query<
      ApiResponse<UpcomingMilestone[]>,
      void
    >({
      query: () => ({
        url: "/api/roadmap/upcoming-milestones",
        method: "GET",
      }),
      providesTags: ["Upcoming"],
      onQueryStarted: onQueryStartedDefault,
    }),

    startRoadmap: builder.mutation<ApiResponse<RoadmapItem>, string>({
      query: (id) => ({
        url: `/api/roadmap/${id}/start`,
        method: "POST",
      }),
      invalidatesTags: ["Roadmaps", "OverallProgress", "Upcoming"],
      onQueryStarted: onMutationStartedDefault,
    }),

    updateMilestoneStatus: builder.mutation<
      ApiResponse<RoadmapItem>,
      { id: string; milestoneId: string; body: UpdateMilestonePayload }
    >({
      query: ({ id, milestoneId, body }) => ({
        url: `/api/roadmap/${id}/milestones/${milestoneId}/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roadmaps", "OverallProgress", "Upcoming"],
      onQueryStarted: onMutationStartedDefault,
    }),

    deleteRoadmap: builder.mutation<ApiResponse<unknown>, string>({
      query: (id) => ({
        url: `/api/roadmap/${id}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["Roadmaps", "OverallProgress", "Upcoming"],
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useGetRoadmapsQuery,
  useGetRoadmapByIdQuery,
  useCreateRoadmapMutation,
  useGetOverallProgressQuery,
  useGetRecommendedRoadmapsQuery,
  useGetUpcomingMilestonesQuery,
  useStartRoadmapMutation,
  useUpdateMilestoneStatusMutation,
  useDeleteRoadmapMutation,
} = roadmapApi;
