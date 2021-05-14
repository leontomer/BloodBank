import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Navbar.css";
import axios from "axios";
import { useAuth } from "../../Contexts/auth-context";

const Navbar = () => {
  const [role, seRole] = React.useState("");
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();

  const [userIsAuthenticated, setUserIsAuthenticated] =
    React.useState(isAuthenticated);

  useEffect(() => {
    (async function getFields() {
      const role = await axios.get("/auth/getRole");
      console.log(role.data);
      seRole(role.data);
    })();
  }, [userIsAuthenticated, isAuthenticated]);

  const handleLogout = () => {
    logout();
    setUserIsAuthenticated(false);
  };

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
      minWidth: 750,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            {isAuthenticated && (role == "Admin" || role == "User") && (
              <Link to="/donateBlood">Blood bank</Link>
            )}
          </Typography>

          <div
            style={{
              width: "750px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {isAuthenticated && role == "Admin" && (
              <Link to="/Donators">
                <Button
                  style={{
                    background: " #58d68d ",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Donators
                </Button>
              </Link>
            )}
            {isAuthenticated &&
              (role == "Admin" || role == "User" || role == "Student") && (
                <Link to="/BankStatus">
                  <Button
                    style={{
                      background: " #58d68d ",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Bank Status
                  </Button>
                </Link>
              )}
            {isAuthenticated && role == "Admin" && (
              <Link to="/GetLogs">
                <Button
                  style={{
                    background: " #5499c7 ",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Get Logs
                </Button>
              </Link>
            )}
            {isAuthenticated && (role == "Admin" || role == "User") && (
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
            )}
            {isAuthenticated && (role == "Admin" || role == "User") && (
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
            )}
            {isAuthenticated && (
              <Button
                style={{
                  background: " #58d68d ",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={handleLogout}
              >
                logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
