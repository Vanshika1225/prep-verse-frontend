import { createBrowserRouter } from "react-router-dom";

import PageNotFound from "../components/PageNotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

import Home from "@/pages/Home/Home";


export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
