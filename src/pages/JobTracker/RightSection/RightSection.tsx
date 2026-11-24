import { Box } from "@mui/material";

import { flexColumn } from "../style";

import { ApplicationOverview } from "./ApplicationOverview";
import { ApplicationProgress } from "./ApplicationProgress";
import { UpcomingInterviews } from "./UpcomingInterviews";

export const RightSection = () => {
  return (
    <Box
      sx={{
        ...flexColumn,
        gap: 2,
        width: "100%",
      }}
    >
      <ApplicationOverview />
      <ApplicationProgress />
      <UpcomingInterviews />
    </Box>
  );
};
