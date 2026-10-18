import {
  AccessTimeRounded,
  CheckCircleRounded,
  LocalFireDepartmentRounded,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import {
  circularProgressStyle,
  lineStyle,
  plannerInnerBox,
  plannerStatWRapper,
} from "../style";

import { useGetStudyPlannerStatsQuery } from "@/services/studyPlannerApi";

const PlannerStats = () => {
  const theme = useTheme();

  const { data: response, isLoading } = useGetStudyPlannerStatsQuery();

  const statsData = response?.data;

  const weeklyProgress = statsData?.weeklyProgress;
  const studyHours = statsData?.studyHours;
  const tasksCompleted = statsData?.tasksCompleted;

  const percentage = weeklyProgress?.percentage ?? 0;
  const completed = weeklyProgress?.completed ?? 0;
  const total = weeklyProgress?.total ?? 0;

  const tasksCompletedCount = tasksCompleted?.count ?? 0;
  const vsLastWeek = tasksCompleted?.vsLastWeek ?? 0;

  // eslint-disable-next-line prefer-const
  let currentStreak = 0;

  const stats = [
    {
      title: "Study Hours",
      value: studyHours?.display ?? "0h 0m",
      change: "vs last week",
      icon: AccessTimeRounded,
      color: "primary" as const,
    },
    {
      title: "Tasks Completed",
      value: String(tasksCompletedCount),
      change: `${Math.abs(vsLastWeek)} ${
        vsLastWeek < 0 ? "fewer" : "more"
      } vs last week`,
      icon: CheckCircleRounded,
      color: "success" as const,
    },
    {
      title: "Current Streak",
      value: `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`,
      change: currentStreak > 0 ? "Keep it up!" : "Start your streak today!",
      icon: LocalFireDepartmentRounded,
      color: "warning" as const,
    },
  ];

  return (
    <Box sx={plannerStatWRapper}>
      <Box
        sx={{
          ...plannerInnerBox,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          {isLoading ? (
            <Skeleton variant="circular" width={72} height={72} />
          ) : (
            <>
              <CircularProgress
                variant="determinate"
                value={Math.min(100, Math.max(0, percentage))}
                size={72}
                thickness={4}
              />
              <Box sx={circularProgressStyle}>
                <Typography variant="subtitle1">{percentage}%</Typography>
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography
            variant="body-medium"
            color={theme.palette.black.secondary}
          >
            Weekly Progress
          </Typography>

          {isLoading ? (
            <Skeleton variant="text" width="65%" height={28} />
          ) : (
            <Typography variant="body-medium" sx={{ mt: 1 }}>
              {completed} / {total} tasks completed
            </Typography>
          )}

          <Box sx={lineStyle}>
            {isLoading ? (
              <Skeleton variant="rounded" width="100%" height="100%" />
            ) : (
              <Box
                sx={{
                  width: `${Math.min(100, Math.max(0, percentage))}%`,
                  height: "100%",
                  bgcolor: theme.palette.primary.main,
                  transition: "width 0.3s ease",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {stats.map(({ title, value, change, icon: Icon, color }) => (
        <Box
          key={title}
          sx={{
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Icon sx={{ color: `${color}.main` }} fontSize="small" />
            <Typography variant="body-medium">{title}</Typography>
          </Box>

          {isLoading ? (
            <Skeleton variant="text" width="45%" height={36} />
          ) : (
            <Typography variant="h6-bold">{value}</Typography>
          )}

          {isLoading ? (
            <Skeleton variant="text" width="75%" height={24} />
          ) : (
            <Typography
              variant="p-medium"
              sx={{
                color:
                  title === "Tasks Completed" && vsLastWeek < 0
                    ? theme.palette.error.main
                    : `${color}.main`,
                display: "block",
                mt: 1,
              }}
            >
              {title === "Tasks Completed" && vsLastWeek < 0 ? "↓" : "↑"}{" "}
              {change}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PlannerStats;
