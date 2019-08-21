import React, { Component } from "react";
import TopNav from "./components/TopNav";
import Form from "./components/Form";
import OpenAccountPage from "./pages/OpenAccountPage";
import { Switch, Route, } from "react-router-dom";

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Form
                />
              )}
            />
            <Route
              exact
              path="/openaccount"
              render={props => (
                <OpenAccountPage
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
