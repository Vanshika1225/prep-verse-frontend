import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import { Box, Button, Typography, useTheme } from "@mui/material";

import {
  jobTrackerIcon,
  promoBannerBtn,
  promoBannerContainer,
  trackApplication,
} from "../../style";

interface JobTrackerBannerProps {
  onGoToTracker?: () => void;
}

export default function JobTrackerBanner({
  onGoToTracker,
}: JobTrackerBannerProps) {
  const theme = useTheme();

  return (
    <Box sx={promoBannerContainer}>
      <Typography
        variant="p-bold"
        sx={{ color: theme.palette.black.main, fontSize: 15 }}
      >
        Apply Smart, Not Hard!
      </Typography>

      <Typography variant="body1-medium" sx={trackApplication}>
        Track applications, set reminders and never miss an opportunity.
      </Typography>

      <Button
        onClick={onGoToTracker}
        endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
        sx={promoBannerBtn}
      >
        Go to Job Tracker
      </Button>

      <Box sx={jobTrackerIcon}>
        <WorkHistoryOutlinedIcon sx={{ fontSize: 72 }} />
      </Box>
    </Box>
  );
}
