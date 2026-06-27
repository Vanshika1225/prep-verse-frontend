import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../components/PageNotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";

export const router = createBrowserRouter([{
    element: <PublicRoutes />,
    children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
    ]
}, {
    element: <ProtectedRoutes />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />
                }
            ]
        }
    ]
}, {
    path: "*",
    element: <PageNotFound />
}])