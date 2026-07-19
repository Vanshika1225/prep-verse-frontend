import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
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
  confirmPassword:string
}

export interface GoogleLoginRequest {
  token: string;
}

const apiUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";

export const authApi = createApi({
  reducerPath: "authApi",

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
        url: "api/auth/forgot-password",
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
        url: "api/auth/reset-password",
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
