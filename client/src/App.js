import React from "react";
import donateBlood from "./DonateBlood";
import getBlood from "./GetBlood";
import getUrgBlood from "./GetUrgentBlood";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={donateBlood} />
        <Route exact path="/getBlood" component={getBlood} />
        <Route exact path="/getUrgBlood" component={getUrgBlood} />
      </Switch>
    </Router>
  );
}

export default App;
