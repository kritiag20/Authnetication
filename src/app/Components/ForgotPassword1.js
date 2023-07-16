import React, { useState, Component, useEffect } from "react";
import "../Assets/CSS/login.css";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/useAuth";
import Wrapper from "./CommonComp/Wrapper";
import AuthLabel from "./CommonComp/AuthLabels";
import AuthTextField from "./CommonComp/AuthTextField";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { forgetPasswordLink } = useAuth();

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };
  const handleEmail = (data) => {
    setEmail(data);
  };
  const handleResetLink = () => {
    if (email !== "") {
      if (ValidateEmail(email)) {
        forgetPasswordLink(email).then((res) => {
          if (res?.code === "ERR_BAD_REQUEST") {
            toast.error("Please enter registered email");
          } else {
            toast.success("Link send to your Registered Email Id");
            navigate("/passwordLink");
          }
        });
      } else {
        toast.error("Please enter valid email");
      }
    } else {
      toast.error("Please enter the email Id");
    }
  };

  return (
    <>
      <Wrapper>
        <Grid
          item
          md={5}
          xs={12}
          style={{ width: "300px" }}
          className="grid_center"
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "600",
              mb: 2,
              fontFamily: "Montserrat",
            }}
          >
            Forget Password
          </Typography>

          <Box>
            <div>
              <AuthLabel text="Email" />
              <AuthTextField type="text" userInput={handleEmail} />
            </div>
            <Box className="btn_wrap">
              <Button
                onClick={() => handleResetLink()}
                className="ContinueButton"
              >
                Send Reset Link
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "right",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "#1492E6",
                fontSize: "12px",
                fontFamily: "Poppins",
                fontWeight: 400,
                cursor: "pointer",
              }}
              onClick={() => navigate("/login", { replace: true })}
            >
              Back to Login
            </Typography>
          </Box>
        </Grid>
      </Wrapper>
    </>
  );
}
