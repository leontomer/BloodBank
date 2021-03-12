import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

import { Link } from "react-router-dom";
import "./drop.css";
const axios = require("axios");

export default function GetUrgentBlood(props) {
  const [open, setOpen] = React.useState(false);
  const [bloodType, setBloodType] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const [amount, setAmount] = useState(0);

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
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getDataFromServer = async () => {
    const res = await axios.post("/dam/getUrgBlood", {
      bloodAmount: amount,
    });
    console.log(res);
    setBloodType(res.data);
    if (res.data === "no blood available") {
      setSeverity("error");
      setBloodType("no blood available");
    }
    setOpen(true);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Get Urgent Blood
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
                  pathname: `/GetBlood`,
                }}
              >
                Get blood
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div class="text">
        <br></br>
        <div>please enter the amount of blood units you need:</div>
        <br></br>
        <input
          type="number"
          min="1"
          onChange={(am) => setAmount(parseInt(am.target.value))}
        />
        <div>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={getDataFromServer}
          >
            Get Urgent Blood
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {bloodType}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
