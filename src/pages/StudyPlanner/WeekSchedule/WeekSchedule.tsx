import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import { dateStyle, gridStyle, weekScheduleTopBar } from "../style";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import {
  useGetWeeklyScheduleQuery,
  type StudyTask,
} from "@/services/studyPlannerApi";

interface Props {
  planId?: string;
  planStart?: Date;
  planMonths?: number;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, count: number) => {
  const result = startOfDay(date);
  result.setDate(result.getDate() + count);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = startOfDay(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
};

const formatDate = (date: Date, withYear = false) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;

const getTaskDateKey = (task: StudyTask) => {
  const date = new Date(task.scheduledDate);

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getUTCDate()).padStart(2, "0")}`;
};

const WeekSchedule = ({ planId, planStart, planMonths = 3 }: Props) => {
  const theme = useTheme();

  const { planFirst, planLast } = useMemo(() => {
    const first = startOfDay(planStart ?? new Date());
    const last = new Date(
      first.getFullYear(),
      first.getMonth() + planMonths,
      first.getDate(),
    );
    last.setDate(last.getDate());
    return { planFirst: first, planLast: last };
  }, [planStart, planMonths]);

  const minWeek = startOfWeek(planFirst);
  const maxWeek = startOfWeek(planLast);

  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = addDays(minWeek, weekOffset * 7);

  const { data, isLoading } = useGetWeeklyScheduleQuery(
    { weekStart: dateKey(weekStart) },
    { skip: !planId },
  );

  const allTasks = Object.values(data?.data?.schedule ?? {}).flatMap(
    (day) => day.tasks ?? [],
  );

  const tasks = allTasks.filter((task) => {
    const taskPlanId =
      typeof task.planId === "string" ? task.planId : task.planId?._id;

    return taskPlanId === planId;
  });

  const weekEnd = addDays(weekStart, 6);
  const canPrev = weekOffset > 0;
  const canNext = weekStart.getTime() < maxWeek.getTime();

  const goPrev = () => {
    if (canPrev) {
      setWeekOffset((current) => current - 1);
    }
  };

  const goNext = () => {
    if (canNext) {
      setWeekOffset((current) => current + 1);
    }
  };

  const weekDates = days.map((_, index) => addDays(weekStart, index));

  const timeSlots = [...new Set(tasks.map((task) => task.startTime))].sort();

  const getColor = (task: StudyTask) =>
    task.status === "Completed"
      ? theme.palette.success.main
      : theme.palette.primary.main;

  const headerCellSx = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    bgcolor: "background.paper",
    borderBottom: `1px solid ${theme.palette.divider}`,
  } as const;

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <Box sx={weekScheduleTopBar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarMonthRoundedIcon fontSize="small" />
          <Typography variant="p-bold">
            {formatDate(weekStart)} – {formatDate(weekEnd, true)}
          </Typography>
        </Box>

        <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={goPrev} disabled={!canPrev}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton size="small" onClick={goNext} disabled={!canNext}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ p: 2 }}>
          <Skeleton variant="rectangular" height={504} sx={{ mb: 1 }} />
        </Box>
      ) : !planId || tasks.length === 0 ? (
        <Box
          sx={{
            height: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& > *": {
              margin: 0,
            },
          }}
        >
          <NoDataFound />
        </Box>
      ) : (
        <Box sx={{ overflow: "auto", maxHeight: 520 }}>
          <Box sx={gridStyle}>
            <Box sx={headerCellSx} />

            {weekDates.map((date, index) => {
              const inRange = date >= planFirst && date <= planLast;

              return (
                <Box
                  key={days[index]}
                  sx={{
                    ...headerCellSx,
                    textAlign: "center",
                    py: 1,
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    opacity: inRange ? 1 : 0.4,
                  }}
                >
                  <Typography
                    variant="body-medium"
                    color={theme.palette.black.secondary}
                  >
                    {days[index]}
                  </Typography>

                  <Typography
                    variant="body-medium"
                    sx={{
                      ...dateStyle,
                      color: theme.palette.black.main,
                    }}
                  >
                    {date.getDate()}
                  </Typography>
                </Box>
              );
            })}

            {timeSlots.map((time) => (
              <Box key={time} sx={{ display: "contents" }}>
                <Box
                  sx={{
                    minHeight: 72,
                    px: 1,
                    py: 1,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="body-bold" color="text.secondary">
                    {time}
                  </Typography>
                </Box>

                {weekDates.map((date, index) => {
                  const inRange = date >= planFirst && date <= planLast;

                  const cellTasks = tasks.filter(
                    (task) =>
                      getTaskDateKey(task) === dateKey(date) &&
                      task.startTime === time,
                  );

                  return (
                    <Box
                      key={`${time}-${days[index]}`}
                      sx={{
                        minHeight: 72,
                        p: 1,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        bgcolor: inRange ? "transparent" : "secondary.light",
                      }}
                    >
                      {cellTasks.map((task) => (
                        <Box
                          key={task._id}
                          sx={{
                            p: 1,
                            mb: 0.5,
                            borderRadius: 1,
                            bgcolor: "action.hover",
                            borderLeft: `3px solid ${getColor(task)}`,
                          }}
                        >
                          <Typography variant="body1-medium">
                            {task.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {task.startTime} – {task.endTime}
                          </Typography>

                          <Typography
                            variant="caption"
                            color={
                              task.status === "Completed"
                                ? "success.main"
                                : "text.secondary"
                            }
                          >
                            {task.status}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WeekSchedule;
