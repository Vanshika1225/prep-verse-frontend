import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import TopBar from "@/components/TopBar/TopBar";
import { drawerWidth } from "@/constants/constants";

const DashboardLayout = () => {
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          ml: {
            xs: 0,
            md: `${drawerWidth}px`,
          },
          p: 3,
        }}
      >
        <TopBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
