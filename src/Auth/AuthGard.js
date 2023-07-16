import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ user, children, token }) => {
  let location = useLocation();

  if (!user && token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default AuthGuard;
