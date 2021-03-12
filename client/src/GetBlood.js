import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import "./drop.css";
import "./side.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
const axios = require("axios");

export default function GetBlood(props) {
  const [blood, setBlood] = useState([]);
  const [selectedType, setselectedType] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    (async function getFields() {
      const blood = await axios.get("/dam/getBlood");
      setBlood(blood.data);
    })();
    setIsLoading(false);
  }, [isLoading]);

  const sendDataToServer = async (bloodType) => {
    const res = await axios.post("/dam/subBlood", {
      bloodType: bloodType.bloodType,
      bloodAmount: amount,
    });

    (async function getFields() {
      const blood = await axios.get("/dam/getBlood");
      setBlood(blood.data);
    })();
    setTimeout(() => {
      setIsLoading(true);
    }, 500);

    setOpen(true);
    setMsg(res.data);
  };
  const classes = useStyles();

  const showContent = () => {
    if (isLoading) {
      return (
        <div className="box">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Get blood
                </Typography>
                <Button color="inherit">
                  {" "}
                  <Link
                    to={{
                      pathname: `/`,
                    }}
                  >
                    Donate blood
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
          <div id="wrapper">
            <div id="left">
              <div class="text">
                <br></br>

                <div>Please enter the blood type you need:</div>
                <br></br>

                <Select
                  required
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedType}
                  onChange={(text) => setselectedType(text.target.value)}
                  label="Type"
                  labelWidth={50}
                  style={{ width: "200px" }}
                >
                  {blood.map(
                    (type, index) =>
                      type.bloodAmount > 0 && (
                        <MenuItem key={index} value={type}>
                          {type.bloodType}
                        </MenuItem>
                      )
                  )}
                </Select>
                <br></br>
                <br></br>
                <div>Please enter the amount of blood you need:</div>
                <br></br>
                <input
                  type="number"
                  min="1"
                  onChange={(am) => setAmount(parseInt(am.target.value))}
                />
                <div>
                  <br></br>
                  <Button
                    onClick={() => sendDataToServer(selectedType)}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    Get Blood
                  </Button>
                </div>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    {msg}
                  </Alert>
                </Snackbar>
              </div>
            </div>{" "}
            <div id="right">
              <TableContainer component={Paper}>
                <div>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Blood Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blood.map((row) => (
                        <TableRow key={row.bloodType}>
                          <TableCell component="th" scope="row">
                            {row.bloodType}
                          </TableCell>
                          <TableCell align="right">{row.bloodAmount}</TableCell>
                        </TableRow>
                      ))}{" "}
                    </TableBody>{" "}
                  </Table>{" "}
                </div>
              </TableContainer>{" "}
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{showContent()}</div>;
}
