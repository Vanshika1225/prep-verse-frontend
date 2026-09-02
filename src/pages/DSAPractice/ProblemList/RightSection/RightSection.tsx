import {
  CheckCircleRounded as CheckCircleRoundedIcon,
  AssignmentRounded as AssignmentRoundedIcon,
  BookmarkRounded as BookmarkRoundedIcon,
  RateReviewRounded as RateReviewRoundedIcon,
  RocketLaunchRounded as RocketLaunchRoundedIcon,
  CodeRounded as CodeRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
} from "@mui/icons-material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import type {
  PieChartData,
  ProblemOverviewResponse,
  RecentProblemItem,
  TopicBreakdownItem,
} from "../types";

import PieChart from "@/components/ChartComponent/PieChart";
import {
  useGetAllProblemOverviewCountQuery,
  useGetAllProblemrecentProblemsQuery,
  useGetAllProblemTopicBreakdownQuery,
} from "@/services/dsaApi";
import theme from "@/theme/theme";

const ProgressOverview = () => {
  const theme = useTheme();
  const { data: OverviewCount } = useGetAllProblemOverviewCountQuery({});
  const overviewData = OverviewCount as ProblemOverviewResponse | undefined;

  const stats = [
    {
      title: "Solved",
      value: overviewData?.data?.solved,
      icon: CheckCircleRoundedIcon,
      iconColor: theme.palette.success.main,
      iconBg: theme.palette.success.light,
    },
    {
      title: "Attempted",
      value: overviewData?.data?.attempted,
      icon: AssignmentRoundedIcon,
      iconColor: theme.palette.primary.main,
      iconBg: `${theme.palette.primary.main}12`,
    },
    {
      title: "Boomarked",
      value: overviewData?.data?.bookmarked,
      icon: BookmarkRoundedIcon,
      iconColor: theme.palette.primary.main,
      iconBg: `${theme.palette.primary.main}12`,
    },
    {
      title: "Review",
      value: overviewData?.data?.review,
      icon: RateReviewRoundedIcon,
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
                {stat.value ?? "-"}
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
  const { data: topicData } = useGetAllProblemTopicBreakdownQuery({});

  const chartData: PieChartData[] =
    (topicData as { data?: TopicBreakdownItem[] } | undefined)?.data?.map(
      (item) => ({
        name: item.topic,
        value: item.solved,
      }),
    ) ?? [];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
        width: "100%",
      }}
    >
      <Typography variant="h6-bold">Topic Wise Problem (Solved)</Typography>

      <PieChart data={chartData} height={200} showLegend showTooltip />
    </Box>
  );
};

const RecentProblem = () => {
  const theme = useTheme();

  const { data: recentProblems } = useGetAllProblemrecentProblemsQuery({}) as {
    data?: { data?: RecentProblemItem[] };
  };

  const problems: RecentProblemItem[] = recentProblems?.data ?? [];

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
          const difficultyStyles = getDifficultyStyles(problem.difficulty);

          return (
            <Box
              key={problem.id}
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
                <CodeRoundedIcon sx={{ fontSize: 18 }} />
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
