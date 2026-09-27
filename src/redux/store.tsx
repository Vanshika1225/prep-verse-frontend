import authReducer from "@redux/slices/authSlice";
import toastReducer from "@redux/slices/toastSlice";
import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/services/authApi";
import { contestApi } from "@/services/contestsApi";
import { dsaApi } from "@/services/dsaApi";
import { randomPracticeApi } from "@/services/randomPracticeApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,

    [authApi.reducerPath]: authApi.reducer,
    [dsaApi.reducerPath]: dsaApi.reducer,
    [randomPracticeApi.reducerPath]: randomPracticeApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dsaApi.middleware,
      randomPracticeApi.middleware,
      contestApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
