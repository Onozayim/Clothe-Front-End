import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

export default function OnlyGuestRoutes({ token }) {
  if (token) return <Navigate to={"/"} />;

  return <Outlet />;
}