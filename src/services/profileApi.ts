import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type {
  LogoutRequest,
  LogoutResponse,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/pages/Profile/types";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import { onMutationStartedDefault } from "@/utils/serviceUtility";

interface RefreshTokenResponse {
  data: { accessToken: string };
}

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

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

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({ url: "/api/users/profile", method: "GET" }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/api/users/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
      onQueryStarted: onMutationStartedDefault,
    }),

    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (body) => ({
        url: "/api/auth/logout",
        method: "POST",
        body,
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = profileApi;
