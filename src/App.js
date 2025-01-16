// import { useState, CreateContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
