import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import "./drop.css";
import "./blood.css";

const axios = require("axios");

function createData(bloodType, amount) {
  return { bloodType, amount };
}

const rows = [
  createData("A+", 0),
  createData("O+", 0),
  createData("B+", 0),
  createData("AB+", 0),
  createData("A-", 0),
  createData("O-", 0),
  createData("B-", 0),
  createData("AB-", 0),
];

export default function DonateBlood(props) {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    table: {
      minWidth: 650,
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const sendDataToServer = async (bloodType) => {
    const res = await axios.post("/dam/addBlood", {
      bloodType: bloodType,
      amount: amount,
    });
    console.log(res);
    if (res.data === "ok") setOpen(true);
  };

  const classes = useStyles();
  return (
    <div class="donateBlood">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Donate blood
            </Typography>
            <Button color="inherit">
              {" "}
              <Link
                to={{
                  pathname: `/GetBlood`,
                }}
              >
                Get blood
              </Link>
            </Button>
            <Button color="inherit">
              {" "}
              <Link
                to={{
                  pathname: `/GetUrgBlood`,
                }}
              >
                Get urgent blood
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      {/* <div class="blood">Please enter blood type amount:</div> */}
      <TableContainer component={Paper}>
        <div class="drop">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Blood Type</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.bloodType}>
                  <TableCell component="th" scope="row">
                    {row.bloodType}
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="number"
                      min="1"
                      onChange={(am) => setAmount(parseInt(am.target.value))}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Button
                      onClick={() => sendDataToServer(row.bloodType)}
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Donate
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity="success">
                        Blood added succesfully!
                      </Alert>
                    </Snackbar>
                  </TableCell>
                </TableRow>
              ))}{" "}
            </TableBody>{" "}
          </Table>{" "}
        </div>
      </TableContainer>{" "}
    </div>
  );
}
