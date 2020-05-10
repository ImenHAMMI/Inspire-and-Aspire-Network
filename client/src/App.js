import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUp from "./components/sign/SignUp";
import SignIn from "./components/sign/SignIn";
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile:id" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
