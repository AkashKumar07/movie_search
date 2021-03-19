import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import SearchMovie from "./SearchMovie";
import MovieDetails from "./MovieDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/" component={SearchMovie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
