import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Button, Chip, Typography, useTheme } from "@mui/material";

import {
  estDurWrapper,
  flexColumn,
  mileStoneActionButtonWrapper,
  updateButtonStyle,
} from "../style";
import type { Milestone, RoadmapItem } from "../type";

import ReusableModal from "@/components/ModalBox/ModalBox";

interface MilestoneActionModalProps {
  open: boolean;
  onClose: () => void;
  milestone: Milestone | null;
  roadmap: RoadmapItem | null;
  onMarkCompleted: (roadmapId: string, milestoneId: string) => Promise<void>;
  isLoading?: boolean;
}

const MilestoneActionModal = ({
  open,
  onClose,
  milestone,
  roadmap,
  onMarkCompleted,
  isLoading = false,
}: MilestoneActionModalProps) => {
  const theme = useTheme();

  if (!milestone || !roadmap) return null;

  const isCompleted = milestone.state === "Completed";
  const milestoneId = milestone._id ?? milestone.id ?? "";

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      heading={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="h6-bold"
            sx={{
              color: theme.palette.black.main,
            }}
          >
            Milestone Details
          </Typography>
          <Chip
            label={milestone.state ?? "Current"}
            size="small"
            sx={{
              fontSize: "11px",
              fontWeight: 600,
              bgcolor: isCompleted
                ? theme.palette.success.light
                : theme.palette.primary.main100,
              color: isCompleted
                ? theme.palette.success.main100
                : theme.palette.primary.main,
            }}
          />
        </Box>
      }
      actions={
        <Box sx={mileStoneActionButtonWrapper}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Close
          </Button>

          {!isCompleted && (
            <Button
              variant="contained"
              startIcon={<CheckCircleOutlineRoundedIcon />}
              onClick={async () => {
                await onMarkCompleted(roadmap._id, milestoneId);
                onClose();
              }}
              disabled={isLoading}
              sx={updateButtonStyle}
            >
              {isLoading ? "Updating..." : "Mark as Completed"}
            </Button>
          )}
        </Box>
      }
    >
      <Box sx={{ ...flexColumn, gap: 2 }}>
        <Box sx={flexColumn}>
          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.black.secondary,
              mb: 0.5,
            }}
          >
            Part of: <strong>{roadmap.title}</strong>
          </Typography>
          <Typography
            variant="h6-bold"
            sx={{
              color: theme.palette.black.main,
            }}
          >
            {milestone.title}
          </Typography>
        </Box>

        <Typography
          variant="body-medium"
          sx={{
            color: theme.palette.black.main200,
            lineHeight: 1.6,
          }}
        >
          {milestone.description ||
            "No description provided for this milestone."}
        </Typography>

        <Box sx={estDurWrapper}>
          <AccessTimeRoundedIcon
            sx={{ fontSize: 18, color: theme.palette.primary.main }}
          />
          <span>
            Estimated duration:{" "}
            <strong>{milestone.estimatedHours} hours</strong>
          </span>
        </Box>
      </Box>
    </ReusableModal>
  );
};

export default MilestoneActionModal;
