import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../components/NotFound";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LearnerCreator from "../pages/LearnerCreator";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RiderCreator from "../pages/RiderCreator";
import SignUp from "../pages/SignUp";
import AllUsers from "../pages/AllUsers";
import MyProfile from "../pages/MyProfile";
import ProtectRegister from "./ProtectRegister";
import ProtectDashboard from "./ProtectDashboard";
import ProtectAdminRoute from "./ProtectAdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/register",
        element: (
          <ProtectRegister>
            <Register />
          </ProtectRegister>
        ),
      },
      {
        path: "/rider-creator",
        element: (
          <ProtectRegister>
            <RiderCreator />
          </ProtectRegister>
        ),
      },
      {
        path: "/learner-creator",
        element: (
          <ProtectRegister>
            <LearnerCreator />
          </ProtectRegister>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectDashboard>
            <DashboardLayout />
          </ProtectDashboard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"my-profile"} />,
          },
          {
            path: "my-profile",
            element: <MyProfile />,
          },
          {
            path: "all-users",
            element: (
              <ProtectAdminRoute>
                <AllUsers />,
              </ProtectAdminRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
