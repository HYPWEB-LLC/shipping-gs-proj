import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ user }) => {
  if (!user) return <Outlet />; // If not logged in, allow access to children

  return <Navigate to="/" />; // If logged in, redirect to home page
};

export default ProtectRoute;
