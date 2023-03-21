import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
