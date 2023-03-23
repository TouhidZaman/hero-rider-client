import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loading from "../components/loaders/Loading";
import { AuthContext } from "../context/AuthProvider";

const ProtectAdminRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectAdminRoute;
