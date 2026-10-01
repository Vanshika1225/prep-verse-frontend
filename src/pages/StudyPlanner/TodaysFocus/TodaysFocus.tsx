import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { taskNameStyle, todaysFocusIneerStyle } from "../style";
import type { PlannerTask } from "../types";

interface Props {
  tasks: PlannerTask[];
}

const TodaysFocus = ({ tasks }: Props) => {
  const theme = useTheme();

  const [items, setItems] = useState(tasks);

  const toggleTask = (id: string) => {
    setItems((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
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

        <IconButton size="small">
          <EditRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {items.map((task) => (
        <Box
          key={task.id}
          onClick={() => toggleTask(task.id)}
          sx={taskNameStyle}
        >
          {task.completed ? (
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
              task.completed
                ? theme.palette.black.secondary
                : theme.palette.text.primary
            }
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TodaysFocus;
