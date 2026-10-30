import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import { addAlert } from "@/redux/slices/toastSlice";

interface AlertResponse {
  message?: string;
}

interface SuccessResponse {
  data?: AlertResponse;
}

interface ErrorResponse {
  error?: {
    status?: string | number;
    message?: string;
    data?: {
      message?: string;
    };
  };
}

interface LifecycleApi {
  dispatch: Dispatch<UnknownAction>;
  queryFulfilled: Promise<SuccessResponse>;
}

const getSuccessMessage = (response: SuccessResponse): string => {
  return response.data?.message ?? "Success";
};

const getErrorMessage = (error: unknown): string => {
  const err = error as ErrorResponse;

  return (
    err.error?.data?.message ??
    err.error?.message ??
    err.error?.status?.toString() ??
    "Something went wrong"
  );
};

export const onMutationStartedDefault = async (
  _arg: unknown,
  { dispatch, queryFulfilled }: LifecycleApi,
): Promise<void> => {
  try {
    const response = await queryFulfilled;

    dispatch(
      addAlert({
        severity: "success",
        title: "Success",
        message: getSuccessMessage(response),
      }),
    );
  } catch (error) {
    dispatch(
      addAlert({
        severity: "error",
        title: "Error",
        message: getErrorMessage(error),
      }),
    );
  }
};

export const onQueryStartedDefault = async (
  _arg: unknown,
  { dispatch, queryFulfilled }: LifecycleApi,
): Promise<void> => {
  try {
    await queryFulfilled;
  } catch (error) {
    dispatch(
      addAlert({
        severity: "error",
        title: "Error",
        message: getErrorMessage(error),
      }),
    );
  }
};