import authReducer from "@redux/slices/authSlice";
import toastReducer from "@redux/slices/toastSlice";
import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/services/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
