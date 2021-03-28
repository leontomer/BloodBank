import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Navbar.css";

const Navbar = () => {
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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/">Blood bank</Link>
          </Typography>

          <div
            style={{
              width: "450px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/BankStatus">
              <Button
                style={{
                  background: " #58d68d ",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Bank status
              </Button>
            </Link>
            <Link to="/GetBlood">
              <Button
                style={{
                  background: " #5499c7 ",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Get Blood
              </Button>
            </Link>
            <Link to="/GetUrgBlood">
              <Button
                style={{
                  background: "  #ec7063  ",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Get Urgent Blood
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
