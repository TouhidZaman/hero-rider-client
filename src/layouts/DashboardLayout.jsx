import { Link, Outlet } from "react-router-dom";
import React from "react";

const DashboardLayout = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*  Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-side-drawer" className="drawer-overlay"></label>
        <ul className="menu overflow-y-auto w-60 bg-base-200 text-base-content">
          {/*  Sidebar content here */}
          <li className="border-b border-primary">
            <Link to={"my-profile"}>My Profile</Link>
          </li>
          <li className="border-b border-primary">
            <Link to={"all-users"}>All Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
