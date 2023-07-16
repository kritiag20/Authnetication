import React, { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import useAuth from "../../Auth/useAuth";
import AuthLabel from "./CommonComp/AuthLabels";
import AuthTextField from "./CommonComp/AuthTextField";
import Wrapper from "./CommonComp/Wrapper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

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

  const handleName = (data) => {
    setName(data);
  };
  const handleEmail = (data) => {
    setEmail(data);
  };

  const handlePhnNo = (data) => {
    setMobile(data);
  };

  const handlePassword = (data) => {
    if (validatePassword(data)) {
      setPassword(data);
    }
  };
  const handleAddress = (data) => {
    setAddress(data);
  };

  const handleSubmit = () => {
    if (
      name !== "" &&
      address !== "" &&
      email !== "" &&
      mobile !== "" &&
      password !== ""
    ) {
      if (ValidateEmail(email)) {
        let value = {
          email,
          password,
          name,
          phone: mobile,
          address,
        };
        register(value).then((res) => {
          if (res?.code === "ERR_BAD_REQUEST") {
            toast.error("Enter valid data");
          } else {
            toast.success("Successfully Signup!");
            navigate("/login");
          }
        });
      } else {
        toast.error("Please enter valid email");
      }
    } else {
      toast.error("Please enter valid data");
    }
  };

  return (
    <Wrapper>
      <Grid item md={12} xs={12} className="grid_center">
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
            mb: 2,
            padding: "30px 10px 0",
            fontFamily: "Montserrat",
          }}
        >
          Register
        </Typography>

        <form className="grid_center">
          <div>
            <AuthLabel text="Name" />
            <AuthTextField type={"text"} userInput={handleName} />
            <AuthLabel text="Email" />
            <AuthTextField type={"text"} userInput={handleEmail} />
            <AuthLabel text="Phone No" />
            <AuthTextField type={"text"} userInput={handlePhnNo} />
            <AuthLabel text="Address" />
            <AuthTextField type={"text"} userInput={handleAddress} />
            <AuthLabel text="Password" />
            <AuthTextField type={"password"} userInput={handlePassword} />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "95%",
              mt: 2,
            }}
          >
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
                  fontWeight: 400,
                }}
              >
                Already have an Account?&nbsp;
              </Typography>
              <Typography
                sx={{
                  color: "#1492E6",
                  fontSize: "12px",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Typography>
            </Box>
          </Box>
          <Box className="btn_wrap">
            <Button onClick={() => handleSubmit()} className="ContinueButton">
              Submit
            </Button>
          </Box>
        </form>
      </Grid>
    </Wrapper>
  );
}
