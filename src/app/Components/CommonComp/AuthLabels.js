import React from "react";
import { Typography } from "@mui/material";
// import "../Assets/CSS/fonts.css";

const AuthLabel = (props) => {
  return (
    <Typography
      sx={{
        pt: 1,
        color: "#000",
        letterSpacing: "0.5px",
        marginBottom: 0.5,
        p: props.p,
        fontSize: "12px",
        display: props.display,
        fontFamily: "Montserrat",
        fontWeight: "700",
        cursor: "default",
      }}
      className="labelFont"
    >
      {props.text}
      {props.children}
    </Typography>
  );
};

export default AuthLabel;
