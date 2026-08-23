import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PieChart from "@/components/ChartComponent/PieChart";
import theme from "@/theme/theme";

const ProgressOverview = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Solved",
      value: "26",
      icon: CheckCircleRoundedIcon,
      iconColor: theme.palette.success.main,
      iconBg: theme.palette.success.light,
    },
    {
      title: "Attempted",
      value: "14",
      icon: AssignmentRoundedIcon,
      iconColor: theme.palette.primary.main,
      iconBg: `${theme.palette.primary.main}12`,
    },
    {
      title: "Time Spent",
      value: "12h 45m",
      icon: AccessTimeRoundedIcon,
      iconColor: theme.palette.primary.main,
      iconBg: `${theme.palette.primary.main}12`,
    },
    {
      title: "Accuracy",
      value: "72%",
      icon: TrackChangesRoundedIcon,
      iconColor: theme.palette.warning.main,
      iconBg: theme.palette.warning.light,
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography variant="h6-bold">Progress Overview</Typography>

        <Box
          component="select"
          defaultValue="This Week"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "6px",
            px: 1,
            py: 0.6,
            fontSize: "12px",
            color: theme.palette.text.primary,
            backgroundColor: "white",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 1.5,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Box
              key={stat.title}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                border: `1px solid ${theme.palette.divider}`,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.8,
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    minWidth: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "7px",
                    bgcolor: stat.iconBg,
                    color: stat.iconColor,
                  }}
                >
                  <Icon sx={{ fontSize: 17 }} />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>

              <Typography
                variant="h6-medium"
                sx={{
                  fontWeight: 545,
                  display: "block",
                  mb: 0.4,
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          mt: 1.5,
          p: 1.5,
          borderRadius: "10px",
          border: `1px solid ${theme.palette.error.main}20`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <LocalFireDepartmentRoundedIcon
              sx={{
                color: theme.palette.error.main,
                fontSize: 28,
                mt: 0.2,
              }}
            />

            <Box>
              <Typography
                variant="body-bold"
                sx={{
                  display: "block",
                  mb: 0.3,
                }}
              >
                12 Day Streak
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: theme.palette.text.secondary,
                  maxWidth: 190,
                  lineHeight: 1.4,
                }}
              >
                You’re building a great habit. Keep it going!
              </Typography>
            </Box>
          </Box>

          <RocketLaunchRoundedIcon
            sx={{
              fontSize: 42,
              color: theme.palette.primary.main,
              opacity: 0.8,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const TopicBreakdown = () => {
  const theme = useTheme();

  const topicData = [
    { name: "Arrays", value: 28 },
    { name: "Strings", value: 22 },
    { name: "Linked Lists", value: 18 },
    { name: "Trees", value: 16 },
    { name: "Graphs", value: 10 },
    { name: "Dynamic Programming", value: 6 },
  ];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
        width:"100%",
    
      }}
    >
      <Typography variant="h6-bold">Topic Breakdown</Typography>

      <PieChart data={topicData} height={200} showLegend showTooltip />
    </Box>
  );
};

const RecentProblem = () => {
  const theme = useTheme();

  const problems = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      icon: CodeRoundedIcon,
    },
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      icon: DataObjectRoundedIcon,
    },
    {
      title: "Maximum Subarray",
      difficulty: "Easy",
      icon: FunctionsRoundedIcon,
    },
    {
      title: "Kth Largest Element",
      difficulty: "Hard",
      icon: AccountTreeRoundedIcon,
    },
  ];

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return {
          color: theme.palette.success.main,
          bgcolor: theme.palette.success.light,
        };

      case "Medium":
        return {
          color: theme.palette.warning.main,
          bgcolor: theme.palette.warning.light,
        };

      case "Hard":
        return {
          color: theme.palette.error.main,
          bgcolor: theme.palette.error.light,
        };

      default:
        return {
          color: theme.palette.text.secondary,
          bgcolor: theme.palette.action.hover,
        };
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography variant="h6-bold">Recent Problems</Typography>

        <Typography
          variant="body1-bold"
          sx={{
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
        >
          View all
        </Typography>
      </Box>

      <Box>
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          const difficultyStyles = getDifficultyStyles(problem.difficulty);

          return (
            <Box
              key={problem.title}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                py: 1.25,
                borderBottom:
                  index !== problems.length - 1
                    ? `1px solid ${theme.palette.divider}`
                    : "none",
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  minWidth: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  bgcolor: `${theme.palette.primary.main}10`,
                  color: theme.palette.primary.main,
                }}
              >
                <Icon sx={{ fontSize: 18 }} />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="body-bold"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mb: 0.2,
                  }}
                >
                  {problem.title}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Coding Problem
                </Typography>
              </Box>

              <Box
                sx={{
                  px: 1,
                  py: 0.4,
                  borderRadius: "6px",
                  bgcolor: difficultyStyles.bgcolor,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: difficultyStyles.color,
                    fontWeight: 600,
                    fontSize: "11px",
                  }}
                >
                  {problem.difficulty}
                </Typography>
              </Box>

              <IconButton
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  p: 0.25,
                  flexShrink: 0,
                }}
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const RightSection = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <>
      <ProgressOverview />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          width: "100%",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <TopicBreakdown />
        <RecentProblem />
      </Box>
    </>
  ) : (
    <Box
      sx={{
        width: "30%",
        flexShrink: 0,
        mt: { md: 0, xs: 2 },
        minWidth: { md: 280, xs: "100%" },
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",

        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ProgressOverview />
      <TopicBreakdown />
      <RecentProblem />
    </Box>
  );
};
