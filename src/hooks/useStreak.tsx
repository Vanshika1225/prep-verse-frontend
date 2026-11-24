import { useGetStreakQuery } from "@/services/DashboardApi";

export const useStreak = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetStreakQuery();
  const streak = data?.data;

  return {
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
    activeToday: streak?.activeToday ?? false,
    lastActiveDate: streak?.lastActiveDate ?? null,
    todaySolved: streak?.todaySolved ?? 0,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
