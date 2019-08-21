import React from 'react';
import TopNav from "./components/TopNav";
import Form from "./components/Form";
import OpenAccountPage from "./components/OpenAccountPage";
import {Switch, Route,} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
    <TopNav />
    <div className="container">

      
    <Switch>

            <Route
              exact
              path="/"
              render={props => (
                <Form />

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

export default App;
