import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import donateBlood from "./components/DonateBlood/DonateBlood";
import getBlood from "./components/GetBlood/GetBlood";
import getUrgBlood from "./components/GetUrgentBlood/GetUrgentBlood";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import BankStatus from "./components/BankStatus/BankStatus";
import Donators from "./components/Donators/Donators";
import { BloodBankProvider } from "./Contexts/BloodBankContext";
import LoginPage from "./components/LoginPage/LoginPage";
import { useAuth } from "./Contexts/auth-context";
import setAuthToken from "./utilities/setAuthToken";
import PrivateRoute from "./components/Routes/PrivateRoute";
import getLogs from "./components/getLogs/getLogs";
import axios from "axios";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const [role, seRole] = React.useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async function getFields() {
      const role = await axios.get("/auth/getRole");
      seRole(role.data);
    })();
  }, [isAuthenticated]);

  return (
    <BloodBankProvider>
      <Router>
        <Navbar />
        <Modal />
        <Loader />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          {(role == "Admin" || role == "User") && (
            <PrivateRoute exact path="/donateBlood" component={donateBlood} />
          )}
          {(role == "Admin" || role == "User") && (
            <PrivateRoute exact path="/getBlood" component={getBlood} />
          )}
          {(role == "Admin" || role == "User") && (
            <PrivateRoute exact path="/getUrgBlood" component={getUrgBlood} />
          )}
          {(role == "Admin" || role == "User" || role == "Student") && (
            <PrivateRoute exact path="/BankStatus" component={BankStatus} />
          )}
          {role == "Admin" && (
            <PrivateRoute exact path="/Donators" component={Donators} />
          )}
          {role == "Admin" && (
            <PrivateRoute exact path="/GetLogs" component={getLogs} />
          )}
        </Switch>
      </Router>
    </BloodBankProvider>
  );
}

export default App;
