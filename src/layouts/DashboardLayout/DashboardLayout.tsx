import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import { drawerWidth } from "@/constants/constants";

const DashboardLayout = () => {
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          ml: `${drawerWidth}px`,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
