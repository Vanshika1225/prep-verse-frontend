import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { logout as logoutAction } from "@/redux/slices/authSlice";
import { getAccessToken, setAccessToken, clearAuth } from "@/utils/authMethods";
import { onMutationStartedDefault } from "@/utils/serviceUtility";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    refreshToken: string;
    accessToken: string;
    user: AuthUser;
  };
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface GoogleLoginRequest {
  token: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
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

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
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
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAuth();
      api.dispatch(logoutAction());

      window.location.href = "/login";
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: "/api/auth/signup",
        method: "POST",
        body,
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body,
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
    resetPassword: builder.mutation<
      ForgotPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body,
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
    googleLogin: builder.mutation<AuthResponse, GoogleLoginRequest>({
      query: ({ token }) => ({
        url: "/api/auth/google",
        method: "POST",
        body: { token },
      }),
      onQueryStarted: onMutationStartedDefault,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useGoogleLoginMutation,
  useResetPasswordMutation,
} = authApi;
