import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import type { Milestone, RoadmapItem } from "../../Roadmap/type";
import {
  categoryIcon,
  commonRoadmapCardStyle,
  connectingLine,
  detailBox,
  flexBoxStyle,
  linearProgress,
  mainHorizontalStepper,
  metaRowStyle,
  milestoneTitle,
  nodeCircle,
  progressAndActionStyle,
  roadmapCardWrapper,
  topHeadeInnerBox,
  topHeaderOuterBox,
  mainHorizontalInner
} from "../style";

import Theme from "@/theme/theme";

interface RoadmapCardProps {
  roadmap: RoadmapItem;
  isStarting?: boolean;
  onMilestoneClick?: (milestone: Milestone, roadmap: RoadmapItem) => void;
  onCardClick?: (roadmap: RoadmapItem) => void;
  onStartRoadmap?: (roadmap: RoadmapItem) => void;
  onDeleteRoadmap?: (roadmap: RoadmapItem) => void;
}

const getCategoryTheme = (category: string, title: string) => {
  const normalized = `${category} ${title}`.toLowerCase();
  if (
    normalized.includes("dsa") ||
    normalized.includes("data structure") ||
    normalized.includes("algorithm")
  ) {
    return {
      icon: <CodeRoundedIcon sx={{ fontSize: 24, color: "#5023e7" }} />,
      bgColor: "#F5F1FF",
    };
  }
  if (
    normalized.includes("web") ||
    normalized.includes("frontend") ||
    normalized.includes("full stack")
  ) {
    return {
      icon: <LanguageRoundedIcon sx={{ fontSize: 24, color: "#16A34A" }} />,
      bgColor: "#DCFCE7",
    };
  }
  if (
    normalized.includes("system") ||
    normalized.includes("design") ||
    normalized.includes("architecture")
  ) {
    return {
      icon: (
        <DesktopWindowsRoundedIcon sx={{ fontSize: 24, color: "#D97706" }} />
      ),
      bgColor: "#FEF3C7",
    };
  }
  return {
    icon: <PsychologyRoundedIcon sx={{ fontSize: 24, color: "#0284C7" }} />,
    bgColor: "#E0F2FE",
  };
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "In Progress":
      return {
        bgcolor: "#F5F1FF",
        color: "#5023e7",
        border: "1px solid #d9cdfb",
      };
    case "Not Started":
      return {
        bgcolor: "#FEF3C7",
        color: "#B45309",
        border: "1px solid #FDE68A",
      };
    case "Completed":
      return {
        bgcolor: "#DCFCE7",
        color: "#16A34A",
        border: "1px solid #BBF7D0",
      };
    default:
      return {
        bgcolor: "#F3F4F6",
        color: "#4B5563",
        border: "1px solid #E5E7EB",
      };
  }
};

const RoadmapCard = ({
  roadmap,
  onMilestoneClick,
  onStartRoadmap,
  onDeleteRoadmap,
}: RoadmapCardProps) => {
  const theme = useTheme();

  const { icon, bgColor } = getCategoryTheme(roadmap.category, roadmap.title);
  const statusStyles = getStatusBadgeStyle(roadmap.status);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={roadmapCardWrapper}>
      <Box sx={topHeaderOuterBox}>
        <Box sx={topHeadeInnerBox}>
          <Box
            sx={{
              ...categoryIcon,
              bgcolor: bgColor,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={detailBox}>
              <Typography
                variant="h6-bold"
                sx={{
                  color: theme.palette.black.main,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {roadmap.title}
              </Typography>

              <Chip
                label={roadmap.status}
                size="small"
                sx={{
                  height: "22px",
                  fontSize: "11px",
                  fontWeight: 600,
                  borderRadius: "999px",
                  ...statusStyles,
                }}
              />
            </Box>

            <Typography
              variant="body-medium"
              sx={{
                color: theme.palette.black.secondary,
                mb: 1.5,
              }}
            >
              {roadmap.description}
            </Typography>

            <Box sx={metaRowStyle}>
              <Box sx={commonRoadmapCardStyle}>
                <ViewListRoundedIcon
                  sx={{ fontSize: 16, color: theme.palette.border.main200 }}
                />
                <span>{roadmap.totalMilestones} Milestones</span>
              </Box>

              <Box sx={commonRoadmapCardStyle}>
                <AccessTimeRoundedIcon
                  sx={{ fontSize: 16, color: theme.palette.border.main200 }}
                />
                <span>~ {roadmap.estimatedHours} hrs</span>
              </Box>

              <Box sx={commonRoadmapCardStyle}>
                <SignalCellularAltRoundedIcon
                  sx={{ fontSize: 16, color: theme.palette.border.main200 }}
                />
                <span>{roadmap.difficulty}</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={progressAndActionStyle}>
          <Box sx={{ width: 120 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.6 }}>
              <Typography
                variant="body1-bold"
                sx={{
                  color: theme.palette.black.main,
                }}
              >
                {roadmap.progress}% Completed
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={roadmap.progress}
              sx={linearProgress}
            />
          </Box>

          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{
              color: theme.palette.border.main200,
              "&:hover": {
                color: theme.palette.black.main,
                bgcolor: theme.palette.white.main500,
              },
            }}
          >
            <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  border: `1px solid ${theme.palette.border.main}`,
                  minWidth: 150,
                  py: 0.5,
                },
              },
            }}
          >
            {roadmap.status === "Not Started" && onStartRoadmap && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClose();
                  onStartRoadmap(roadmap);
                }}
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  gap: 1,
                  "&:hover": { bgcolor: theme.palette.primary.main100 },
                }}
              >
                <PlayArrowRoundedIcon sx={{ fontSize: 18 }} />
                Start Roadmap
              </MenuItem>
            )}

            {onDeleteRoadmap && (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClose();
                  onDeleteRoadmap(roadmap);
                }}
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: theme.palette.error.main300,
                  gap: 1,
                  "&:hover": { bgcolor: theme.palette.border.main200 },
                }}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                Delete Roadmap
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Box>

      <Box sx={mainHorizontalStepper}>
        <Box sx={mainHorizontalInner}>
          {roadmap.milestones.map((milestone, index) => {
            const isCompleted = milestone.state === "Completed";
            const isCurrent = milestone.state === "Current";
            const isLocked = !isCompleted && !isCurrent;
            const isLast = index === roadmap.milestones.length - 1;

            return (
              <Box
                key={milestone._id ?? milestone.id ?? index}
                sx={flexBoxStyle}
                onClick={() => onMilestoneClick?.(milestone, roadmap)}
              >
                {!isLast && (
                  <Box
                    sx={{
                      ...connectingLine,
                      bgcolor: isCompleted
                        ? theme.palette.success.main
                        : `1px solid ${theme.palette.border.main}`,
                    }}
                  />
                )}

                <Tooltip title={milestone.description || milestone.title} arrow>
                  <Box
                    sx={{
                      ...nodeCircle,
                      bgcolor: isCompleted
                        ? Theme.palette.success.main
                        : isCurrent
                          ? theme.palette.primary.main
                          : theme.palette.white.main,
                      border: isCompleted
                        ? "none"
                        : isCurrent
                          ? `3px solid ${theme.palette.primary.main200}`
                          : `1.5px solid ${theme.palette.white.main400}`,
                      transition: "transform 0.15s ease",
                      "&:hover": {
                        transform: "scale(1.15)",
                      },
                    }}
                  >
                    {isCompleted && (
                      <CheckRoundedIcon
                        sx={{ fontSize: 16, color: theme.palette.white.main }}
                      />
                    )}
                    {isCurrent && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: theme.palette.white.main,
                        }}
                      />
                    )}
                    {isLocked && (
                      <LockOutlinedIcon
                        sx={{
                          fontSize: 12,
                          color: theme.palette.border.main200,
                        }}
                      />
                    )}
                  </Box>
                </Tooltip>

                <Typography
                  variant="body1-medium"
                  sx={{
                    ...milestoneTitle,
                    fontWeight: isCompleted || isCurrent ? 600 : 500,
                    color:
                      isCompleted || isCurrent
                        ? theme.palette.black.main
                        : theme.palette.black.secondary,
                  }}
                >
                  {milestone.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapCard;
