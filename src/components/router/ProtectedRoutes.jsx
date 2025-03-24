import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

export default function ProtectedRoutes({ token }) {
  console.log("PROTECTED()");
  if (!token) return <Navigate to={"/login"} />;

  return <Outlet />;
}
