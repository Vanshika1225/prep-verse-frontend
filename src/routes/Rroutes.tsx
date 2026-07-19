import { createBrowserRouter } from "react-router-dom";

import PageNotFound from "../components/PageNotFound";
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Analytics from "@/pages/Analytics/Analytics";
import CheckYourEmail from "@/pages/Authentication/ForgotPassword/ForgotPassword/CheckYourEmail";
import ForgotPassword from "@/pages/Authentication/ForgotPassword/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/Authentication/ForgotPassword/ResetPassword/ResetPassword";
import ResetSucessScreen from "@/pages/Authentication/ForgotPassword/ResetPassword/ResetSucessScreen";
import Contests from "@/pages/DSAPractice/Contests/Contests";
import MockTests from "@/pages/DSAPractice/MockTests/MockTests";
import PatternWiseList from "@/pages/DSAPractice/PatternWiseList/PatternWiseList";
import ProblemList from "@/pages/DSAPractice/ProblemList/ProblemList";
import RandomPractice from "@/pages/DSAPractice/RandomPractice/RandomPractice";
import Goals from "@/pages/Goals/Goals";
import Home from "@/pages/Home/Home";
import JobOpenings from "@/pages/JobOpenings/JobOpenings";
import JobTracker from "@/pages/JobTracker/JobTracker";
import NotesAndDocs from "@/pages/NotesAndDocs/NotesAndDocs";
import ResumeBuilder from "@/pages/ResumeBuilder/ResumeBuilder";
import Roadmap from "@/pages/Roadmap/Roadmap";
import StudyPlanner from "@/pages/StudyPlanner/StudyPlanner";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    element: <PublicRoutes />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/check-your-email", element: <CheckYourEmail /> },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      { path: "/password-updated", element: <ResetSucessScreen /> },
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
          {
            path: "/study-planner",
            element: <StudyPlanner />,
          },
          {
            path: "/practice",
            children: [
              {
                index: true,
                element: <ProblemList />,
              },
              {
                path: "problems",
                element: <ProblemList />,
              },
              {
                path: "patterns",
                element: <PatternWiseList />,
              },
              {
                path: "random-practice",
                element: <RandomPractice />,
              },
              {
                path: "contests",
                element: <Contests />,
              },
              {
                path: "mock-tests",
                element: <MockTests />,
              },
            ],
          },
          {
            path: "/job-tracker",
            element: <JobTracker />,
          },
          {
            path: "/job-openings",
            element: <JobOpenings />,
          },
          {
            path: "/notes-and-docs",
            element: <NotesAndDocs />,
          },
          {
            path: "/roadmap",
            element: <Roadmap />,
          },
          {
            path: "/goals",
            element: <Goals />,
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/resume-builder",
            element: <ResumeBuilder />,
          },
          {
            path: "*",
            element: <PageNotFound />,
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
