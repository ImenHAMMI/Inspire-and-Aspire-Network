import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Home from "./components/Home";

import "./App.css";

class App extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/profile:id"
              render={(props) => (
                <Profile
                  {...props}
                  open={this.state.open}
                  handleOpen={this.handleOpen}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
