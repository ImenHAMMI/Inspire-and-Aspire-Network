import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "../js/actions/action";
import "../css/signin.css";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
  };

  handleChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  login = (e) => {
    e.preventDefault();
    this.props.login(this.state);
    // if (localStorage.getItem("token")) this.props.history.push("/");
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : localStorage.getItem("token") != null ? (
      <Redirect to="/" />
    ) : (
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <h2>Welcome back,</h2>
        {/* <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel> */}
        <OutlinedInput
          id="outlined-adornment-email"
          type="email"
          name="email"
          defaultValue={this.state.email}
          onChange={this.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
              {/* <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
                edge="end"
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton> */}
            </InputAdornment>
          }
          labelWidth={70}
        />
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={this.state.showPassword ? "text" : "password"}
          name="password"
          defaultValue={this.state.password}
          onChange={this.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
                edge="end"
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        <p className="forgot-pass">Forgot password?</p>
        <Link to="/">
          <button type="button" className="submit" onClick={this.login}>
            Sign In
          </button>
        </Link>
        <div className="sub-container">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
          </div>
        </div>
        <Link to="/register">
          <span className="m--up">Sign Up</span>
        </Link>
      </FormControl>
    );
  }
}

export default connect(null, { login })(SignIn);
