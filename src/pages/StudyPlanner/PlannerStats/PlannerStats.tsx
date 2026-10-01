import {
  AccessTimeRounded,
  CheckCircleRounded,
  LocalFireDepartmentRounded,
} from "@mui/icons-material";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

import {
  circularProgressStyle,
  lineStyle,
  plannerInnerBox,
  plannerStatWRapper,
} from "../style";

const stats = [
  {
    title: "Study Hours",
    value: "24h 30m",
    change: "12% vs last week",
    icon: AccessTimeRounded,
    color: "primary" as const,
  },
  {
    title: "Tasks Completed",
    value: "18",
    change: "8 vs last week",
    icon: CheckCircleRounded,
    color: "success" as const,
  },
  {
    title: "Current Streak",
    value: "12 days",
    change: "Keep it up!",
    icon: LocalFireDepartmentRounded,
    color: "warning" as const,
  },
];

const PlannerStats = () => {
  const theme = useTheme();

  return (
    <Box sx={plannerStatWRapper}>
      <Box
        sx={{
          ...plannerInnerBox,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={68}
            size={72}
            thickness={4}
          />
          <Box sx={circularProgressStyle}>
            <Typography variant="subtitle1">68%</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body-medium"
            color={theme.palette.black.secondary}
          >
            Weekly Progress
          </Typography>

          <Typography variant="body-medium" sx={{ mt: 1 }}>
            18 / 26 tasks completed
          </Typography>

          <Box sx={lineStyle}>
            <Box
              sx={{
                width: "68%",
                height: "100%",
                bgcolor: theme.palette.primary.main,
              }}
            />
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

          <Typography variant="h6-bold">{value}</Typography>

          <Typography
            variant="p-medium"
            sx={{ color: `${color}.main`, display: "block", mt: 1 }}
          >
            ↑ {change}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PlannerStats;
