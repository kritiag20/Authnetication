import axios from "../../Auth/AuthInstance";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightgrey",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const [allData, setallData] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("/lists?page=0&size=10", config)
      .then((response) => {
        setallData(response.data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className="flex_center">
      <TableContainer component={Paper} style={{ width: "80%" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Airline</StyledTableCell>
              <StyledTableCell align="center">Trips</StyledTableCell>
              <StyledTableCell align="left">Head Quaters</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.airline[0]?.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.trips}</StyledTableCell>
                <StyledTableCell align="left">
                  {row?.airline[0]?.head_quaters}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard;
