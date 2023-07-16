import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
});

const AuthTextField = ({ userInput, email, type }) => {
  return (
    <CssTextField
      type={type}
      onChange={(e) => userInput(e.target.value)}
      autoComplete="off"
      className="mb textfield"
    />
  );
};

export default AuthTextField;
