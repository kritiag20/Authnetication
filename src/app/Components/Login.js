import React, { useState } from "react";
import "../Assets/CSS/login.css";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/useAuth";
import Wrapper from "./CommonComp/Wrapper";
import AuthLabel from "./CommonComp/AuthLabels";
import AuthTextField from "./CommonComp/AuthTextField";
import toast from "react-hot-toast";

export default function Login() {
  let navigate = useNavigate();
  const [isInvalidemail, setisInvalidemail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidPassword, setisInvalidPassword] = useState(false);
  const { login } = useAuth();

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const validatePassword = (pass) => {
    let reg =
      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    if (reg.test(pass)) {
      return true;
    }
    return false;
  };

  const goToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };
  const handleEmail = (data) => {
    if (ValidateEmail(data)) {
      setEmail(data);
    }
  };

  const handlePassword = (data) => {
    let value = data;
    if (validatePassword(value)) {
      setPassword(value);
      setisInvalidPassword(false);
    } else {
      setisInvalidPassword(true);
    }
  };

  const handleLogin = () => {
    if (ValidateEmail(email)) {
      setisInvalidemail(false);
      if (email !== "" && password !== "") {
        login(email.toLowerCase(), password).then((res) => {
          if (res?.code === "ERR_BAD_REQUEST") {
            toast.error("Enter valid email and password");
          } else {
            toast.success("Successfully LoggedIn!");
            goToDashboard();
          }
        });
      }
    } else {
      setisInvalidemail(true);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="grid_center">
          <Typography style={{ fontWeight: 600, padding: "20px 0" }}>
            LOGIN
          </Typography>
          <div className="d-flex flex-column">
            <AuthLabel text="Email" />
            <AuthTextField type="text" userInput={handleEmail} />
            {isInvalidemail ? (
              <Box className="flex_center errorMsg">
                Invalid Password!. Should contain atleast 1 capital letter,
                special char and numbers
              </Box>
            ) : null}
            <AuthLabel text="Password" />
            <AuthTextField type="password" userInput={handlePassword} />
            {isInvalidPassword ? (
              <Box className="flex_center errorMsg">
                Invalid Password!. Should contain atleast 1 capital letter,
                special char and numbers
              </Box>
            ) : null}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 2,
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  color: "#1492E6",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                  fontWeight: 300,
                }}
                onClick={() => navigate("/forgetPassword")}
              >
                Forget Password ?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontFamily: "Poppins",
                    fontWeight: 300,
                  }}
                >
                  Dont have an Account?&nbsp;
                </Typography>
                <Typography
                  sx={{
                    color: "#1492E6",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "Poppins",
                    fontWeight: 300,
                  }}
                  onClick={() => navigate("/signup", { replace: true })}
                >
                  Sign Up
                </Typography>
              </Box>
            </Box>
          </div>
          <Box className="btn_wrap">
            <Button onClick={() => handleLogin()} className="ContinueButton">
              Login
            </Button>
          </Box>
        </div>
      </Wrapper>
    </>
  );
}
