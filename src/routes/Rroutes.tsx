import { createBrowserRouter } from "react-router";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "../components/PageNotFound";

export const router = createBrowserRouter([{
    element: <PublicRoutes />,
    children: [
        { path: "/login" },
        { path: "/signup" },
    ]
}, {
    element: <ProtectedRoutes />,
    children: [
        {
            path: "/dashboard"
        }
    ]
}, {
    path: "*",
    element: <PageNotFound />
}])