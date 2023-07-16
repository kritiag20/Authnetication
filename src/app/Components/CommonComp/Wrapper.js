import { Card } from "@mui/material";
import React from "react";

function Wrapper({ children }) {
  return (
    <div className="login flex_center">
      <Card className="card_wrap flex_center">{children}</Card>
    </div>
  );
}

export default Wrapper;
