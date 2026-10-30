import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { actionButton, quickActionOuterBox } from "../style";

interface QuickActionsWidgetProps {
  onCreateRoadmap: () => void;
  onStartRoadmap?: () => void;
  onUpdateMilestone?: () => void;
  onBrowseTemplates?: () => void;
}

export const QuickActionsWidget = ({
  onCreateRoadmap,
  onStartRoadmap,
  onUpdateMilestone,
}: QuickActionsWidgetProps) => {
  const theme = useTheme();

  const actions = [
    {
      title: "Create Roadmap",
      icon: (
        <AddRoundedIcon
          sx={{ fontSize: 18, color: theme.palette.primary.main }}
        />
      ),
      onClick: onCreateRoadmap,
    },
    {
      title: "Start Roadmap",
      icon: (
        <PlayArrowRoundedIcon
          sx={{ fontSize: 18, color: theme.palette.primary.main }}
        />
      ),
      onClick: onStartRoadmap,
    },
    {
      title: "Update Milestone",
      icon: (
        <TaskAltRoundedIcon
          sx={{ fontSize: 18, color: theme.palette.primary.main }}
        />
      ),
      onClick: onUpdateMilestone,
    },
  ];

  return (
    <Box sx={quickActionOuterBox}>
      <Typography
        variant="p-bold"
        sx={{
          color: theme.palette.black.main,
          mb: 2,
        }}
      >
        Quick Actions
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1.5,
        }}
      >
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outlined"
            onClick={action.onClick}
            startIcon={action.icon}
            sx={actionButton}
          >
            {action.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
