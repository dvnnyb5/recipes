import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/nav/NavBar";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
