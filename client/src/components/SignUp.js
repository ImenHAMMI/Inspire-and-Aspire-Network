import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import { register } from "../js/actions/action";
import "../scss/signin.scss";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
  };

  changeHandler = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  register = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };
  render() {
    const { isLoading, user } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : user ? (
      <Redirect to="/login" />
    ) : (
      <div className="cont">
        {/* //   <div class="sub-cont">
          // <div class="img">
          //   <div class="img__text m--in">
          //     <h2>One of us?</h2>
          //     <p>
          //       If you already has an account, just sign in. We've missed you!
          //     </p>
          //   </div>
          //   <div class="img__btn">
          //     <span class="m--in">Sign In</span>
          //   </div>
          // </div> */}
        {/* //   <FormControl>
      //   <InputLabel htmlFor="my-input">Email address</InputLabel>
      //   <Input id="my-input" aria-describedby="my-helper-text" />
      //   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      // </FormControl> */}
        <h2>Time to feel like home,</h2>
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Name required"
            defaultValue={this.state.name}
            onChange={this.changeHandler}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="E-Mail required"
            defaultValue={this.state.email}
            onChange={this.changeHandler}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password required"
            defaultValue={this.state.password}
            onChange={this.changeHandler}
          />
        </label>

        <button type="button" className="submit" onClick={this.register}>
          Sign Up
        </button>
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  user: state.authReducer.user,
});
export default connect(mapsStateToProps, { register })(SignUp);
