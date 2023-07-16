import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../Auth/useAuth";
import toast from "react-hot-toast";

export const SignOutButton = () => {
  const { logout, isdecodetoken } = useAuth();
  let navigate = useNavigate();

  const Logoutcall = () => {
    logout(isdecodetoken).then((res) => {
      if (res) {
        toast.success("Successfully Logout! ");
        navigate("/login");
        localStorage.removeItem("accessToken");
      }
    });
  };
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
      <Button
        sx={{
          fontSize: "15px",
          fontWeight: "500",
          height: "40px",
          border: "1px solid #000",
          color: "#000",
          margin: "15px",
        }}
        className="flex_center"
        onClick={() => Logoutcall()}
      >
        Logout{" "}
        <LogoutIcon
          sx={{ float: "right", fontSize: "15px", paddingLeft: "10px" }}
        />{" "}
      </Button>
    </Box>
  );
};
