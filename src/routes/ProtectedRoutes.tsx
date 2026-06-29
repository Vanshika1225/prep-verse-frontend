import { Navigate, Outlet } from "react-router-dom";

import { getAccessToken } from "@/utils/authMethods";

const ProtectedRoutes = () => {
  return getAccessToken() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
