import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loading from "../components/loaders/Loading";
import { AuthContext } from "../context/AuthProvider";

const ProtectDashboard = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !user) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  if (!isLoading && user && !user?.role) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectDashboard;
