import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { taskNameStyle, todaysFocusIneerStyle } from "../style";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import {
  useGetTodayFocusQuery,
  useUpdateTasksStatusMutation,
} from "@/services/studyPlannerApi";

const TodaysFocus = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetTodayFocusQuery();
  const [updateTasksStatus, { isLoading: isUpdating }] =
    useUpdateTasksStatusMutation();

  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const tasks = data?.data ?? [];

  const groupedTasks = Object.values(
    tasks.reduce<
      Record<
        string,
        {
          title: string;
          ids: string[];
          statuses: ("Pending" | "Completed")[];
        }
      >
    >((groups, task) => {
      const key = task.title.trim().toLowerCase();

      groups[key] ??= {
        title: task.title,
        ids: [],
        statuses: [],
      };

      groups[key].ids.push(task._id);
      groups[key].statuses.push(task.status);

      return groups;
    }, {}),
  );

  const toggleTask = async (
    key: string,
    ids: string[],
    isCompleted: boolean,
  ) => {
    if (isUpdating) return;

    const nextCompleted = !isCompleted;

    setOverrides((prev) => ({ ...prev, [key]: nextCompleted }));

    try {
      await updateTasksStatus({
        ids,
        status: nextCompleted ? "Completed" : "Pending",
      }).unwrap();
    } catch {
      setOverrides((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Box sx={todaysFocusIneerStyle}>
        <Typography variant="p-bold">Today's Focus</Typography>
      </Box>

      {isLoading ? (
        <Box>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} variant="rounded" height={28} sx={{ my: 1 }} />
          ))}
        </Box>
      ) : groupedTasks.length === 0 ? (
        <NoDataFound />
      ) : (
        <Box sx={{ maxHeight: 200, overflowY: "auto", pr: 1 }}>
          {groupedTasks.map((task) => {
            const key = task.title.trim().toLowerCase();
            const isCompleted =
              overrides[key] ??
              task.statuses.every((status) => status === "Completed");

            return (
              <Box
                key={key}
                onClick={() => void toggleTask(key, task.ids, isCompleted)}
                sx={{
                  ...taskNameStyle,
                  cursor: isUpdating ? "wait" : "pointer",
                  pointerEvents: isUpdating ? "none" : "auto",
                }}
              >
                {isCompleted ? (
                  <CheckCircleRoundedIcon
                    fontSize="small"
                    sx={{ color: theme.palette.success.main }}
                  />
                ) : (
                  <RadioButtonUncheckedRoundedIcon
                    fontSize="small"
                    sx={{ color: theme.palette.black.secondary }}
                  />
                )}

                <Typography
                  variant="body-medium"
                  color={
                    isCompleted
                      ? theme.palette.black.secondary
                      : theme.palette.text.primary
                  }
                  sx={{
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default TodaysFocus;
