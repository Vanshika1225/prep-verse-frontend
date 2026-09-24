import { Box } from "@mui/material";

import ContestHeader from "./ContestHeader/ContestHeader";
import ContestSidebar from "./ContestSidebar/ContestSidebar";
import ContestTabs from "./ContestTabs/ContestTabs";
import RecentCompleted from "./RecentCompleted/RecentCompleted";
import { mainGrid } from "./style";

export default function Contest() {
  return (
    <Box sx={{ p: 0.5 }}>
      <Box sx={mainGrid}>
        <Box sx={{ minWidth: 0 }}>
          <ContestHeader />
          <ContestTabs />
          <RecentCompleted />
        </Box>

        <ContestSidebar />
      </Box>
    </Box>
  );
}
