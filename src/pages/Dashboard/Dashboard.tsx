import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  InputAdornment,
  LinearProgress,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import { flexColumn, styles } from "./styles";
import type { CardProps, JobCardItem, LinkTextProps } from "./types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import SelectComponent from "@/components/SelectComponent";
import { useStreak } from "@/hooks/useStreak";
import {
  useGetDashboardSummaryQuery,
  useGetDisciplineScoreQuery,
  useGetWeeklyActivityQuery,
} from "@/services/DashboardApi";
import { useGetJobsQuery } from "@/services/JobOpeningsApi";
import { useGetUpcomingContestsQuery } from "@/services/contestsApi";
import { useGetPatternWiseProblemsQuery } from "@/services/dsaApi";
import {
  useCreateStudyPlanMutation,
  useGetTodayFocusQuery,
  useUpdateTasksStatusMutation,
} from "@/services/studyPlannerApi";

const toText = (v: any) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return v.display ?? "";
  return String(v);
};

const Card = ({ title, action, children }: CardProps) => {
  const theme = useTheme();

  return (
    <Box sx={styles.card(theme)}>
      {(title ?? action) && (
        <Box sx={styles.cardHeader}>
          <Typography variant="p-bold">{title}</Typography>
          {action}
        </Box>
      )}
      {children}
    </Box>
  );
};

const LinkText = ({ label, onClick }: LinkTextProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="body1-bold"
      onClick={onClick}
      sx={styles.linkText(theme)}
    >
      {label}
    </Typography>
  );
};

const StatsSkeleton = () => (
  <Box sx={styles.statsGrid}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Card key={i}>
        <Skeleton variant="text" width="55%" height={22} />
        <Skeleton variant="text" width="45%" height={38} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width="35%" height={20} />
        </Box>

        <Box
          sx={{
            height: 40,
            mt: 1,
            display: "flex",
            alignItems: "end",
          }}
        >
          <Skeleton variant="rounded" width="100%" height={30} />
        </Box>
      </Card>
    ))}
  </Box>
);

const TodaysPlanSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Skeleton variant="rounded" width={34} height={34} />
        <Skeleton variant="text" width={`${45 + (i % 3) * 10}%`} height={25} />
        <Box sx={{ flex: 1 }} />
        <Skeleton variant="rounded" width={65} height={25} />
      </Box>
    ))}

    <Box sx={{ mt: 1 }}>
      <Skeleton variant="text" width="45%" height={22} />
      <Skeleton variant="rounded" width="100%" height={8} />
    </Box>
  </Box>
);

const DisciplineScoreSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        width: 150,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Skeleton variant="circular" width={150} height={150} />
    </Box>

    <Skeleton variant="text" width="75%" height={25} sx={{ mt: 2 }} />
    <Skeleton variant="text" width="50%" height={22} />
  </Box>
);

const WeeklyActivitySkeleton = () => (
  <Box sx={styles.heatGrid}>
    <Skeleton variant="text" width={25} />

    {Array.from({ length: 7 }).map((_, i) => (
      <Skeleton key={i} variant="text" width={25} />
    ))}

    {Array.from({ length: 4 }).map((_, r) => (
      <Box key={r} sx={{ display: "contents" }}>
        <Skeleton variant="text" width={35} />

        {Array.from({ length: 7 }).map((_, c) => (
          <Skeleton key={c} variant="rounded" width="100%" height={22} />
        ))}
      </Box>
    ))}
  </Box>
);

const ContestSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {Array.from({ length: 3 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="65%" height={25} />
          <Skeleton variant="text" width="45%" height={20} />
        </Box>

        <Skeleton variant="rounded" width={80} height={32} />
      </Box>
    ))}
  </Box>
);

const DsaPatternsSkeleton = () => {
  const theme = useTheme();

  return (
    <Box sx={styles.patternsScroll}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i} sx={styles.patternCard(theme)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton variant="circular" width={25} height={25} />
            <Skeleton variant="text" width="65%" height={25} />
          </Box>

          <Skeleton variant="text" width="55%" height={22} />

          <Skeleton variant="rounded" width="100%" height={8} sx={{ my: 1 }} />

          <Skeleton variant="rounded" width="100%" height={32} />
        </Box>
      ))}
    </Box>
  );
};

const JobOpeningsSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="55%" height={20} />
        </Box>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Skeleton variant="rounded" width={45} height={24} />
          <Skeleton variant="rounded" width={45} height={24} />
        </Box>

        <Skeleton variant="text" width={55} height={22} />
        <Skeleton variant="text" width={65} height={22} />
      </Box>
    ))}
  </Box>
);

const StatsRow = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetDashboardSummaryQuery();
  const stats = data?.data.stats ?? [];

  const colors = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.primary.main800,
  ];

  if (isLoading) return <StatsSkeleton />;

  return (
    <Box sx={styles.statsGrid}>
      {stats.map((s, i) => (
        <Card key={s.key}>
          <Box sx={flexColumn}>
            <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
              {toText(s.label)}
            </Typography>

            <Typography variant="h5-bold">{toText(s.value) ?? 0}</Typography>

            <Box sx={styles.statDelta(theme)}>
              <ArrowUpwardRoundedIcon sx={{ fontSize: 14 }} />
              <Typography variant="body1-medium" sx={{ color: "inherit" }}>
                {toText(s.delta) ?? 0}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: 40, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={s.trend.map((v) => ({ v }))}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={colors[i % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

const TodaysPlan = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetTodayFocusQuery();
  const [updateTasks] = useUpdateTasksStatusMutation();

  const tasks = data?.data ?? [];
  const done = tasks.filter((t) => t.status === "Completed").length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <Card title="Today's Plan">
      {isLoading ? (
        <TodaysPlanSkeleton />
      ) : tasks.length === 0 ? (
        <NoDataFound message="No tasks planned for today. Add one to get started." />
      ) : (
        <>
          <Box sx={styles.planTasks}>
            {tasks.map((t) => (
              <Box key={t._id} sx={styles.planRow}>
                <Box sx={styles.planLeft}>
                  <Checkbox
                    size="small"
                    checked={t.status === "Completed"}
                    onChange={(e) =>
                      void updateTasks({
                        ids: [t._id],
                        status: e.target.checked ? "Completed" : "Pending",
                      })
                    }
                  />
                  <Typography variant="body1-medium">{t.title}</Typography>
                </Box>

                <Chip
                  size="small"
                  label={t.topic}
                  sx={styles.primaryChip(theme)}
                />
              </Box>
            ))}
          </Box>

          <Box sx={styles.planFooter}>
            <Typography variant="body1-medium">
              {done}/{tasks.length} tasks completed
            </Typography>

            <LinearProgress
              variant="determinate"
              value={percent}
              sx={styles.planProgress}
            />

            <Typography variant="body1-bold">{percent}%</Typography>
          </Box>
        </>
      )}
    </Card>
  );
};

const DisciplineScore = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetDisciplineScoreQuery();
  const d = data?.data;

  return (
    <Card title="Discipline Score">
      {isLoading ? (
        <DisciplineScoreSkeleton />
      ) : !d ? (
        <NoDataFound message="Score appears after your first week of activity." />
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Box sx={styles.scoreRing}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={100}
              thickness={3}
              sx={{
                color: theme.palette.primary.main100,
              }}
            />

            <CircularProgress
              variant="determinate"
              value={d.score}
              size={100}
              thickness={3}
              sx={styles.scoreArc(theme)}
            />

            <Box sx={styles.scoreCenter}>
              <Typography variant="h4-bold">{d.score}</Typography>

              <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
                /100
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1-medium" sx={styles.scoreMessage}>
            {toText(d.message)}
          </Typography>

          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.success.main,
            }}
          >
            ↑ {d.changeFromLastWeek} pts from last week
          </Typography>
        </Box>
      )}
    </Card>
  );
};

const WeeklyActivity = () => {
  const theme = useTheme();

  const [range, setRange] = useState("week");

  const { data, isLoading } = useGetWeeklyActivityQuery({
    range: range as "week" | "month",
  });

  const a = data?.data;

  return (
    <Card
      title="Weekly Activity"
      action={
        <SelectComponent
          label="Range"
          value={range}
          onChange={setRange}
          options={[
            { label: "This Week", value: "week" },
            { label: "This Month", value: "month" },
          ]}
          minWidth={150}
          width={150}
        />
      }
    >
      {isLoading ? (
        <WeeklyActivitySkeleton />
      ) : !a ? (
        <NoDataFound message="Your activity will show up here." />
      ) : (
        <Box sx={styles.heatGrid}>
          <span />

          {a.days.map((d) => (
            <Typography
              key={d}
              variant="body1-medium"
              sx={styles.heatDay(theme)}
            >
              {d}
            </Typography>
          ))}

          {a.slots.map((slot, r) => (
            <Box key={`${slot}-${r}`} sx={{ display: "contents" }}>
              <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
                {slot}
              </Typography>

              {a.levels[r]?.map((lvl, c) => (
                <Box key={c} sx={styles.heatCell(theme, lvl)} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

const PlannerGenerator = () => {
  const theme = useTheme();

  const [createPlan, { isLoading }] = useCreateStudyPlanMutation();

  const [duration, setDuration] = useState("6 Months");
  const [daily, setDaily] = useState("4-6 hrs");
  const [level, setLevel] = useState("Intermediate");
  const [target, setTarget] = useState("SDE / Full Stack Developer");

  const hours: Record<string, [string, string]> = {
    "2-3 hrs": ["19:00", "22:00"],
    "4-6 hrs": ["17:00", "22:00"],
    "6-8 hrs": ["14:00", "22:00"],
  };

  const opts = (arr: string[]) => arr.map((v) => ({ label: v, value: v }));

  const generate = () =>
    void createPlan({
      name: `${target} Plan`,
      duration,
      organizationType: "Product",
      learningTrack: target,
      specializations: [level],
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      availableFrom: hours[daily]?.[0] ?? "17:00",
      availableUntil: hours[daily]?.[1] ?? "22:00",
    });

  return (
    <Card title="Planner Generator">
      <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
        Get your personalized study plan.
      </Typography>

      <Box sx={styles.plannerForm}>
        <Box sx={styles.durationRow}>
          {["2 Months", "4 Months", "6 Months"].map((d) => (
            <Button
              key={d}
              size="small"
              variant={duration === d ? "contained" : "outlined"}
              onClick={() => setDuration(d)}
            >
              {d}
            </Button>
          ))}
        </Box>

        <SelectComponent
          label="Daily"
          value={daily}
          onChange={setDaily}
          options={opts(Object.keys(hours))}
          minWidth={155}
          width={100}
        />

        <SelectComponent
          label="Level"
          value={level}
          onChange={setLevel}
          options={opts(["Beginner", "Intermediate", "Advanced"])}
          minWidth={155}
          width={100}
        />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <SelectComponent
            label="Target"
            value={target}
            onChange={setTarget}
            options={opts([
              "SDE / Full Stack Developer",
              "Backend Developer",
              "Frontend Developer",
            ])}
            minWidth="100%"
            width={100}
          />
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        disabled={isLoading}
        onClick={generate}
        startIcon={<AutoAwesomeRoundedIcon />}
        sx={{ mt: 2 }}
      >
        {isLoading ? "Generating..." : "Generate My Plan"}
      </Button>
    </Card>
  );
};

const UpcomingContests = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading } = useGetUpcomingContestsQuery();
  const contests = data?.contests.slice(0, 5) ?? [];

  return (
    <Card
      title="Upcoming Contests"
      action={
        <LinkText
          label="View All"
          onClick={() => navigate("/practice/contests")}
        />
      }
    >
      {isLoading ? (
        <ContestSkeleton />
      ) : contests.length === 0 ? (
        <NoDataFound message="No upcoming contests right now." />
      ) : (
        contests.map((c) => (
          <Box key={c._id} sx={styles.contestRow}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body1-bold" noWrap>
                {c.name}
              </Typography>

              <Box sx={styles.contestMeta(theme)}>
                <CalendarTodayRoundedIcon sx={{ fontSize: 12 }} />

                <Typography variant="body1-medium" sx={{ color: "inherit" }}>
                  {new Date(c.startTime).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  · {c.duration} mins
                </Typography>
              </Box>
            </Box>

            <Button
              size="small"
              variant="contained"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </Button>
          </Box>
        ))
      )}
    </Card>
  );
};

const QuickLinks = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const links = [
    {
      label: "Roadmap",
      sub: "Choose your path",
      icon: <MapRoundedIcon />,
      to: "/roadmap",
    },
    {
      label: "Study Planner",
      sub: "Plan your daily study",
      icon: <EventNoteRoundedIcon />,
      to: "/study-planner",
    },
    {
      label: "DSA Practice",
      sub: "Solve problems by pattern",
      icon: <CodeRoundedIcon />,
      to: "/practice/patterns",
    },
    {
      label: "Job Tracker",
      sub: "Track your applications",
      icon: <WorkOutlineRoundedIcon />,
      to: "/job-tracker",
    },
  ];

  return (
    <Card title="Quick Links">
      <Box sx={styles.quickGrid}>
        {links.map((l) => (
          <Box
            key={l.label}
            onClick={() => navigate(l.to)}
            sx={styles.quickItem(theme)}
          >
            <Box
              sx={{
                color: theme.palette.primary.main,
                display: "flex",
              }}
            >
              {l.icon}
            </Box>

            <Box sx={flexColumn}>
              <Typography variant="body1-bold">{l.label}</Typography>

              <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
                {l.sub}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

const DsaPatterns = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetPatternWiseProblemsQuery();

  const patterns = useMemo(
    () =>
      (data?.data.patterns ?? []).filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  );

  return (
    <Card
      title="DSA Practice · Pattern-wise"
      action={
        <TextField
          size="small"
          placeholder="Search patterns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      }
    >
      {isLoading ? (
        <DsaPatternsSkeleton />
      ) : patterns.length === 0 ? (
        <NoDataFound message="No patterns match your search." />
      ) : (
        <Box sx={styles.patternsScroll}>
          {patterns.map((p) => (
            <Box key={p.name} sx={styles.patternCard(theme)}>
              <Box sx={styles.patternHeader}>
                <CodeRoundedIcon
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />

                <Typography variant="body1-bold" noWrap>
                  {p.name}
                </Typography>
              </Box>

              <Typography variant="body1-medium" sx={styles.mutedText(theme)}>
                {p.solvedProblems}/{p.totalProblems} solved
              </Typography>

              <LinearProgress
                variant="determinate"
                value={p.progress}
                sx={styles.patternProgress}
              />

              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() =>
                  navigate(
                    `/dsa-practice/pattern-wise?pattern=${encodeURIComponent(p.name)}`,
                  )
                }
              >
                Start
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

const JobOpenings = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading } = useGetJobsQuery({
    limit: 4,
    page: 1,
  });

  const jobs = (
    (data?.data as unknown as { jobs?: JobCardItem[] })?.jobs ?? []
  ).slice(0, 4);

  return (
    <Card
      title="Job Openings"
      action={
        <LinkText label="View All" onClick={() => navigate("/job-openings")} />
      }
    >
      {isLoading ? (
        <JobOpeningsSkeleton />
      ) : jobs.length === 0 ? (
        <NoDataFound message="No job openings available right now." />
      ) : (
        jobs.map((j) => (
          <Box key={j._id} sx={styles.jobRow(theme)}>
            <Box sx={{ ...flexColumn, minWidth: 0 }}>
              <Typography variant="body1-bold" noWrap>
                {j.title}
              </Typography>

              <Typography
                variant="body1-medium"
                sx={styles.mutedText(theme)}
                noWrap
              >
                {toText(j.company)}
                {toText(j.location) ? ` · ${toText(j.location)}` : ""}
              </Typography>
            </Box>

            <Box sx={styles.jobSkills}>
              {j.skills?.slice(0, 3).map((s: any) => (
                <Chip
                  key={s}
                  size="small"
                  label={s}
                  sx={styles.primaryChip(theme)}
                />
              ))}
            </Box>

            <Typography variant="body1-medium" sx={styles.jobMeta}>
              {toText(j.experience)}
            </Typography>

            <Typography variant="body1-medium" sx={styles.jobMeta}>
              {toText(j.salary)}
            </Typography>
          </Box>
        ))
      )}
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  const { data } = useGetDashboardSummaryQuery();
  const user = data?.data.user;

  const { currentStreak, isLoading: streakLoading } = useStreak();

  return (
    <Box>
      <Box sx={styles.headerRow}>
        <Box sx={flexColumn}>
          <Typography variant="h5-bold">
            {user?.name ? `Good morning, ${user.name}! 👋` : "Good morning! 👋"}
          </Typography>

          <Typography variant="body-medium" sx={styles.mutedText(theme)}>
            Let's keep building your dream career.
          </Typography>
        </Box>

        <Box sx={styles.headerActions}>
          {streakLoading ? (
            <Skeleton variant="rounded" width={110} height={32} />
          ) : (
            <Chip
              icon={<LocalFireDepartmentRoundedIcon />}
              label={`${currentStreak} Day Streak`}
              sx={styles.streakChip(theme)}
            />
          )}
        </Box>
      </Box>

      <Box sx={styles.mainGrid}>
        <Box sx={styles.column}>
          <StatsRow />

          <Box sx={styles.planScoreActivityRow}>
            <TodaysPlan />
            <DisciplineScore />
            <WeeklyActivity />
          </Box>

          <DsaPatterns />

          <Box>
            <JobOpenings />
          </Box>
        </Box>

        <Box sx={styles.column}>
          <PlannerGenerator />
          <UpcomingContests />
          <QuickLinks />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
