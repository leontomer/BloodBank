import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import { Content } from "../../Common/content";
import { useAuth } from "../../Contexts/auth-context";

import axios from "axios";

import { useLoader } from "../../Contexts/LoaderContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage({ history }) {
  const classes = useStyles();
  const { startLoading, finishLoading } = useLoader();
  const { login } = useAuth();
  const { isAuthenticated } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      startLoading();
      const res = await axios.post("/auth/login", loginData);
      if (res.data) login(res.data);
      finishLoading();

      if (res.data.role == "Student") {
        history.push("/BankStatus");
      } else {
        history.push("/donateBlood");
      }
    } catch (error) {
      finishLoading();
      return;
    }
  };

  const goToDashboard = () => {
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2">Blood Bank</Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={"Username"}
            name="email"
            autoFocus
            onChange={onChange}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={"Password"}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            value={password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>

          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </form>
      </div>
      <div style={{ width: "400px", height: "100px", marginTop: "20px" }}></div>
      <Box mt={8}></Box>
    </Container>
  );
}
