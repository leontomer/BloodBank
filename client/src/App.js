import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import donateBlood from "./components/DonateBlood/DonateBlood";
import getBlood from "./components/GetBlood/GetBlood";
import getUrgBlood from "./components/GetUrgentBlood/GetUrgentBlood";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import BankStatus from "./components/BankStatus/BankStatus";
import { BloodBankProvider } from "./Contexts/BloodBankContext";
function App() {
  return (
    <BloodBankProvider>
      <Router>
        <Navbar />
        <Modal />
        <Loader />
        <Switch>
          <Route exact path="/" component={donateBlood} />
          <Route exact path="/getBlood" component={getBlood} />
          <Route exact path="/getUrgBlood" component={getUrgBlood} />
          <Route exact path="/BankStatus" component={BankStatus} />
        </Switch>
      </Router>
    </BloodBankProvider>
  );
}

export default App;
