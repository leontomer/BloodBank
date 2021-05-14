import React from "react";
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
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { useAuth } from "./Contexts/auth-context";
import setAuthToken from "./utilities/setAuthToken";
import PrivateRoute from "./components/Routes/PrivateRoute";
import getLogs from "./components/getLogs/getLogs";
function App() {
  const { loggedIn } = useAuth();
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <BloodBankProvider>
      <Router>
        <Navbar />
        <Modal />
        <Loader />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/donateBlood" component={donateBlood} />
          <PrivateRoute exact path="/getBlood" component={getBlood} />
          <PrivateRoute exact path="/getUrgBlood" component={getUrgBlood} />
          <PrivateRoute exact path="/BankStatus" component={BankStatus} />
          <PrivateRoute exact path="/Donators" component={Donators} />
          <PrivateRoute exact path="/GetLogs" component={getLogs} />
        </Switch>
      </Router>
    </BloodBankProvider>
  );
}

export default App;
