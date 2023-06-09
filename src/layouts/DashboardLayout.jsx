import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer drawer-mobile h-[calc(100vh-95px)] overflow-hidden">
      <input id="dashboard-side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*  Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-side-drawer" className="drawer-overlay"></label>
        <ul className="menu overflow-y-auto h-100 w-60 bg-base-200 text-base-content">
          {/*  Sidebar content here */}
          <li className="border-b border-primary">
            <Link to={"my-profile"}>My Profile</Link>
          </li>
          {user.role === "admin" ? (
            <li className="border-b border-primary">
              <Link to={"all-users"}>All Users</Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
