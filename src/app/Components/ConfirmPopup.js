import React from "react";
import Wrapper from "./CommonComp/Wrapper";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConfirmPopup() {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate("/login", { replace: true });
  };
  return (
    <Wrapper>
      <Box className="grid_center">
        <Typography
          style={{ fontWeight: 600, padding: "20px 0", fontSize: "24px" }}
        >
          Password Reset link sent
        </Typography>
        <Box className="btn_wrap">
          <Button onClick={() => handleConfirm()} className="ContinueButton">
            Ok
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
}

export default ConfirmPopup;
