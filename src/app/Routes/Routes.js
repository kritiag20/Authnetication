import AuthGuard from "../../Auth/AuthGard";
import React from "react";
import { useRoutes } from "react-router-dom";
import { Link, Outlet, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import useAuth from "../../Auth/useAuth";
import Login from "../Components/Login";
import Signup from "../Components/Signup.js";
import Dashboard from "../Components/Dashboard";
import ForgotPassword from "../Components/ForgotPassword1";
import ResetPassword from "../Components/ResetPassword";
import ConfirmPopup from "../Components/ConfirmPopup";
import { SignOutButton } from "../Components/SignOutButton";

function AuthLayout() {
  return (
    <Box className="login App">
      <SignOutButton />
      <React.Suspense>
        <Box>
          <Outlet />
        </Box>
      </React.Suspense>
    </Box>
  );
}

export default function PageRouter() {
  const { isAuthenticated, isdecodetoken } = useAuth();

  let elements = useRoutes([
    {
      key: "private",
      path: "/",
      element: (
        <AuthGuard user={isAuthenticated} token={isdecodetoken}>
          <AuthLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          key: "private1",
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      key: "public0",
      path: "/login",
      element: <Login />,
    },
    {
      key: "public2",
      path: "/signup",
      element: <Signup />,
    },
    {
      key: "public6",
      path: "/forgetPassword",
      element: <ForgotPassword />,
    },
    {
      key: "public6",
      path: "/passwordLink",
      element: <ConfirmPopup />,
    },
    {
      key: "public7",
      path: "/user/password/reset/:tokenId",
      element: <ResetPassword />,
    },
  ]);

  return elements;
}
