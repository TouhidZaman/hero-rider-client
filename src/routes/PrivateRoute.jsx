import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loading from "../components/loaders/Loading";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  // console.log("user:", user);
  // console.log("loading:", isLoading);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !user) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  if (!isLoading && user?.role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
