import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import { dateStyle, gridStyle, weekScheduleTopBar } from "../style";
import type { ScheduleItem } from "../types";

interface Props {
  schedule: ScheduleItem[];
  planStart?: Date;
  planMonths?: number;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const addDays = (d: Date, n: number) => {
  const r = startOfDay(d);
  r.setDate(r.getDate() + n);
  return r;
};

const startOfWeek = (d: Date) => {
  const r = startOfDay(d);
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7));
  return r;
};

const fmt = (d: Date, withYear = false) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });

const WeekSchedule = ({ schedule, planStart, planMonths = 3 }: Props) => {
  const theme = useTheme();

  const { planFirst, planLast } = useMemo(() => {
    const first = startOfDay(planStart ?? new Date());
    const last = new Date(
      first.getFullYear(),
      first.getMonth() + planMonths,
      first.getDate(),
    );
    last.setDate(last.getDate() - 1);
    return { planFirst: first, planLast: last };
  }, [planMonths, planStart]);

  const minWeek = startOfWeek(planFirst);
  const maxWeek = startOfWeek(planLast);

  const [weekStart, setWeekStart] = useState<Date>(minWeek);

  const weekEnd = addDays(weekStart, 6);
  const canPrev = weekStart > minWeek;
  const canNext = weekStart < maxWeek;

  const goPrev = () => canPrev && setWeekStart(addDays(weekStart, -7));
  const goNext = () => canNext && setWeekStart(addDays(weekStart, 7));

  const getColor = (type: ScheduleItem["type"]) => {
    const colors = {
      dsa: theme.palette.success.main,
      system: theme.palette.black.main,
      web: theme.palette.error.main,
      revision: theme.palette.warning.main,
      other: theme.palette.primary.main,
    };

    return colors[type];
  };

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
      }}
    >
      <Box sx={weekScheduleTopBar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarMonthRoundedIcon fontSize="small" />
          <Typography variant="p-bold">
            {fmt(weekStart)} – {fmt(weekEnd, true)}
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

      <Box sx={{ overflow: "auto", maxHeight: 520 }}>
        <Box sx={gridStyle}>
          <Box sx={headerCellSx} />

          {days.map((day, index) => {
            const date = addDays(weekStart, index);
            const inRange = date >= planFirst && date <= planLast;

            return (
              <Box
                key={day}
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
                  {day}
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

          {schedule.map((item) => (
            <Box key={item.id} sx={{ display: "contents" }}>
              <Box
                sx={{
                  minHeight: 72,
                  px: 1,
                  py: 1,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body-bold" color="text.secondary">
                  {item.start}
                </Typography>
              </Box>

              {days.map((day, index) => {
                const date = addDays(weekStart, index);
                const inRange = date >= planFirst && date <= planLast;
                const showItem =
                  inRange && (day !== "Sun" || item.type === "other");

                return (
                  <Box
                    key={`${item.id}-${day}`}
                    sx={{
                      minHeight: 72,
                      p: 1,
                      borderTop: `1px solid ${theme.palette.divider}`,
                      borderLeft: `1px solid ${theme.palette.divider}`,
                      bgcolor: inRange
                        ? "transparent"
                        : "action.disabledBackground",
                    }}
                  >
                    {showItem && (
                      <Box
                        sx={{
                          p: 1,
                          height: "100%",
                          borderRadius: 1,
                          borderLeft: `3px solid ${getColor(item.type)}`,
                        }}
                      >
                        <Typography variant="body1-medium">
                          {item.title}
                        </Typography>

                        {item.subtitle && (
                          <Typography
                            variant="body1-medium"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {item.subtitle}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WeekSchedule;
