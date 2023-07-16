import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AuthLabel from "./CommonComp/AuthLabels";
import AuthTextField from "./CommonComp/AuthTextField";
import Wrapper from "./CommonComp/Wrapper";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Auth/useAuth";
import toast from "react-hot-toast";

function ResetPassword() {
  const { tokenId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotMatched, setisNotMatched] = useState(false);
  const [error, seterror] = useState(false);
  const { reset } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    let reg =
      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    if (reg.test(pass)) {
      return true;
    }
    return false;
  };

  const handlePassword = (data) => {
    if (validatePassword(data)) {
      setPassword(data);
    }
  };

  const handleConfirmPassword = (data) => {
    if (validatePassword(data)) {
      setConfirmPassword(data);
    }
  };

  const handleChangePassword = () => {
    if (password !== "" && confirmPassword !== "") {
      seterror(false);
      if (password === confirmPassword) {
        setisNotMatched(false);
        reset(password, tokenId).then((res) => {
          toast.success("Password changed Successfully");
          navigate("/login");
        });
      } else {
        setisNotMatched(true);
      }
    } else {
      seterror(true);
    }
  };
  return (
    <Wrapper>
      <div className="grid_center">
        <Typography style={{ fontWeight: 600, padding: "20px 0" }}>
          Reset Password
        </Typography>
        <div className="d-flex flex-column">
          <AuthLabel text="New Password" />
          <AuthTextField type="password" userInput={handlePassword} />
          <AuthLabel text="Confirm Password" />
          <AuthTextField type="password" userInput={handleConfirmPassword} />
          {isNotMatched ? (
            <Box className="flex_center errorMsg">
              Invalid Password!. Both Password should be same.
            </Box>
          ) : null}
          {error ? (
            <Box className="flex_center errorMsg">
              Password should not be empty.
            </Box>
          ) : null}
        </div>
        <Box className="btn_wrap">
          <Button
            onClick={() => handleChangePassword()}
            className="ContinueButton"
          >
            Change Password
          </Button>
        </Box>
      </div>
    </Wrapper>
  );
}

export default ResetPassword;
