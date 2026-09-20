import {
  LightbulbRounded as LightbulbRoundedIcon,
  LocalFireDepartmentRounded as LocalFireDepartmentRoundedIcon,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  Skeleton,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";

import { useRandomPractice } from "../context";
import {
  card,
  difficultyChip,
  rightSectionStyles,
  sectionTitle,
} from "../style";
import { DAILY_GOAL, type Difficulty, type RecentActivityItem } from "../types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetAllProblemsQuery } from "@/services/dsaApi";
import { useGetRandomPracticeRecentActivityQuery } from "@/services/randomPracticeApi";

const toDayKey = (value: string) => new Date(value).toDateString();

const getSolvedStreak = (items: RecentActivityItem[]) => {
  const days = new Set(
    items
      .filter((item) => item.status === "Solved")
      .map((item) => toDayKey(item.updatedAt)),
  );

  const cursor = new Date();
  let streak = 0;

  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const formatWhen = (value: string) => {
  const diffDays = Math.floor(
    (Date.now() - new Date(value).getTime()) / 86400000,
  );

  if (diffDays <= 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  return `${diffDays} days ago`;
};

const TodaysProgress = () => {
  const theme = useTheme();
  const styles = rightSectionStyles(theme);

  const { data, isLoading } = useGetRandomPracticeRecentActivityQuery();
  const activity = useMemo(() => data?.data ?? [], [data]);

  const summary = useMemo(() => {
    const today = new Date().toDateString();

    const solvedToday = activity.filter(
      (item) => item.status === "Solved" && toDayKey(item.updatedAt) === today,
    ).length;

    const attempted = activity.length;
    const solved = activity.filter((item) => item.status === "Solved").length;

    return {
      solvedToday,
      accuracy: attempted > 0 ? Math.round((solved / attempted) * 100) : 0,
      streak: getSolvedStreak(activity),
    };
  }, [activity]);

  const percent = Math.min(
    Math.round((summary.solvedToday / DAILY_GOAL) * 100),
    100,
  );

  const stats = [
    { label: "Solved Today", value: `${summary.solvedToday} / ${DAILY_GOAL}` },
    { label: "Recent Accuracy", value: `${summary.accuracy}%` },
  ];

  return (
    <Box sx={card(theme)}>
      <Typography variant="h6-bold" sx={sectionTitle}>
        Today&apos;s Progress
      </Typography>

      {isLoading ? (
        <Box sx={styles.progressBody}>
          <Skeleton variant="circular" width={110} height={110} />

          <Box sx={styles.statList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="text" height={20} />
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={styles.progressBody}>
          <Box sx={styles.dialWrapper}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={110}
              thickness={4}
              sx={styles.dialTrack}
            />

            <CircularProgress
              variant="determinate"
              value={percent}
              size={110}
              thickness={4}
              sx={styles.dialValue}
            />

            <Box sx={styles.dialLabel}>
              <Typography variant="h6-bold">{percent}%</Typography>

              <Typography variant="body1-medium" sx={styles.statLabel}>
                Daily Goal
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.statList}>
            {stats.map((stat) => (
              <Box key={stat.label} sx={styles.statRow}>
                <Typography variant="body-medium" sx={styles.statLabel}>
                  {stat.label}
                </Typography>

                <Typography variant="body-bold" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}

            <Box sx={styles.statRow}>
              <Typography variant="body-medium" sx={styles.statLabel}>
                Current Streak
              </Typography>

              <Box sx={styles.streakValue}>
                <LocalFireDepartmentRoundedIcon sx={{ fontSize: 17 }} />

                <Typography
                  variant="body-bold"
                  sx={{ color: "inherit", fontWeight: 600 }}
                >
                  {summary.streak} days
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const QuickFilters = () => {
  const theme = useTheme();
  const styles = rightSectionStyles(theme);

  const {
    filters,
    setTopics,
    setDifficulty,
    setExcludeSolved,
    setBookmarkedOnly,
    resetFilters,
  } = useRandomPractice();

  const { data: problemsResponse } = useGetAllProblemsQuery({
    page: 1,
    limit: 1,
  });

  const topicOptions = useMemo(
    () => [
      { label: "All Topics", value: "" },
      ...(problemsResponse?.data?.filters?.topics ?? []).map((value) => ({
        label: value,
        value,
      })),
    ],
    [problemsResponse],
  );

  const difficultyOptions = useMemo(
    () => [
      { label: "All Difficulties", value: "" },
      ...(problemsResponse?.data?.filters?.difficulties ?? []).map((value) => ({
        label: value,
        value,
      })),
    ],
    [problemsResponse],
  );

  const toggles = [
    {
      key: "excludeSolved",
      label: "Exclude Solved",
      checked: filters.excludeSolved,
      onChange: setExcludeSolved,
    },
    {
      key: "bookmarkedOnly",
      label: "Bookmarked Only",
      checked: filters.bookmarkedOnly,
      onChange: setBookmarkedOnly,
    },
  ];

  return (
    <Box sx={card(theme)}>
      <Box sx={styles.filterHeader}>
        <Typography variant="h6-bold" sx={sectionTitle}>
          Quick Filters
        </Typography>

        <Typography
          variant="body1-bold"
          sx={styles.clearLink}
          onClick={resetFilters}
        >
          Clear
        </Typography>
      </Box>

      <Box sx={styles.filterField}>
        <Typography variant="body1-medium" sx={styles.filterLabel}>
          Topics
        </Typography>

        <Select
          size="small"
          value={filters.topics[0] ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setTopics(value ? [value] : []);
          }}
          displayEmpty
          fullWidth
          sx={{
            bgcolor: "white",
            borderRadius: "8px",
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 300,
                  overflowY: "auto",
                },
              },
            },
          }}
        >
          {topicOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={styles.filterField}>
        <Typography variant="body1-medium" sx={styles.filterLabel}>
          Difficulty
        </Typography>

        <Select
          size="small"
          value={filters.difficulty[0] ?? ""}
          onChange={(e) => {
            const value = e.target.value as Difficulty | "";
            setDifficulty(value ? [value] : []);
          }}
          displayEmpty
          fullWidth
          sx={{
            bgcolor: "white",
            borderRadius: "8px",
          }}
        >
          {difficultyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {toggles.map((toggle) => (
        <Box key={toggle.key} sx={styles.toggleRow}>
          <Typography variant="body-medium">{toggle.label}</Typography>

          <Switch
            size="small"
            checked={toggle.checked}
            onChange={(_, checked) => toggle.onChange(checked)}
          />
        </Box>
      ))}
    </Box>
  );
};

const RecentActivity = () => {
  const theme = useTheme();
  const styles = rightSectionStyles(theme);

  const { data, isLoading } = useGetRandomPracticeRecentActivityQuery();
  const activity: RecentActivityItem[] = data?.data ?? [];

  return (
    <Box sx={card(theme)}>
      <Box sx={styles.filterHeader}>
        <Typography variant="h6-bold" sx={sectionTitle}>
          Recent Activity
        </Typography>

        <Typography variant="body1-bold" sx={styles.clearLink}>
          View All
        </Typography>
      </Box>

      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Box key={index} sx={styles.sessionRow(index === 3)}>
            <Skeleton variant="text" width="70%" height={22} />
            <Skeleton variant="text" width="45%" height={16} />
          </Box>
        ))
      ) : activity.length === 0 ? (
        <Box sx={{ minHeight: 140, display: "flex", alignItems: "center" }}>
          <NoDataFound
            noImage={false}
            message="Problems you solve will show up here"
          />
        </Box>
      ) : (
        activity.map((item, index) => (
          <Box
            key={item.problemId}
            sx={styles.sessionRow(index === activity.length - 1)}
          >
            <Box sx={styles.sessionTop}>
              <Typography variant="body-bold" sx={styles.sessionTitle}>
                {item.title}
              </Typography>

              <Chip
                label={item.difficulty}
                size="small"
                sx={difficultyChip(theme, item.difficulty)}
              />
            </Box>

            <Box sx={styles.sessionMeta}>
              <Typography variant="body1-medium" sx={{ color: "inherit" }}>
                {item.status}
              </Typography>

              <Typography variant="body1-medium" sx={{ color: "inherit" }}>
                {formatWhen(item.updatedAt)}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

const TipsCard = () => {
  const theme = useTheme();
  const styles = rightSectionStyles(theme);

  return (
    <Box sx={styles.tipsCard}>
      <Box sx={styles.tipsHeader}>
        <LightbulbRoundedIcon
          sx={{ fontSize: 20, color: theme.palette.primary.main }}
        />

        <Typography variant="h6-bold" sx={sectionTitle}>
          Tips
        </Typography>
      </Box>

      <Typography variant="body-medium" sx={styles.tipsText}>
        Solve problems randomly to improve problem solving skills and pattern
        recognition.
      </Typography>
    </Box>
  );
};

export const RightSection = () => {
  const theme = useTheme();
  const styles = rightSectionStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <>
      <TodaysProgress />

      <Box sx={styles.mobileRow}>
        <QuickFilters />
        <RecentActivity />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TipsCard />
      </Box>
    </>
  ) : (
    <Box sx={styles.root}>
      <TodaysProgress />
      <QuickFilters />
      <RecentActivity />
      <TipsCard />
    </Box>
  );
};

export default RightSection;
