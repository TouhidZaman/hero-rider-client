import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LearnerCreator from "../pages/LearnerCreator";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RiderCreator from "../pages/RiderCreator";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";

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
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        ),
      },
      {
        path: "/rider-creator",
        element: (
          <PrivateRoute>
            <RiderCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/learner-creator",
        element: (
          <PrivateRoute>
            <LearnerCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
