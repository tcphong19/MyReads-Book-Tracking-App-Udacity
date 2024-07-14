import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BookSearch from "./Pages/BookSearch";
import "./App.css";

const App = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={BookSearch} />
    </div>
  </Router>
);

export default App;
