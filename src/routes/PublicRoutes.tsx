import { Navigate, Outlet } from "react-router-dom";

import { getAccessToken } from "@/utils/authMethods";

const PublicRoutes = () => {
  return getAccessToken() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
