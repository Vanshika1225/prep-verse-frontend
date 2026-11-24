import authReducer from "@redux/slices/authSlice";
import toastReducer from "@redux/slices/toastSlice";
import { configureStore } from "@reduxjs/toolkit";

import { dashboardApi } from "@/services/DashboardApi";
import { jobOpeningsApi } from "@/services/JobOpeningsApi";
import { authApi } from "@/services/authApi";
import { contestApi } from "@/services/contestsApi";
import { dsaApi } from "@/services/dsaApi";
import { jobTrackerApi } from "@/services/jobTrackerApi";
import { profileApi } from "@/services/profileApi";
import { randomPracticeApi } from "@/services/randomPracticeApi";
import { roadmapApi } from "@/services/roadmapApi";
import { studyPlannerApi } from "@/services/studyPlannerApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,

    [authApi.reducerPath]: authApi.reducer,
    [dsaApi.reducerPath]: dsaApi.reducer,
    [randomPracticeApi.reducerPath]: randomPracticeApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
    [studyPlannerApi.reducerPath]: studyPlannerApi.reducer,
    [roadmapApi.reducerPath]: roadmapApi.reducer,
    [jobOpeningsApi.reducerPath]: jobOpeningsApi.reducer,
    [jobTrackerApi.reducerPath]: jobTrackerApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dsaApi.middleware,
      randomPracticeApi.middleware,
      contestApi.middleware,
      studyPlannerApi.middleware,
      roadmapApi.middleware,
      jobOpeningsApi.middleware,
      jobTrackerApi.middleware,
      dashboardApi.middleware,
      profileApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
