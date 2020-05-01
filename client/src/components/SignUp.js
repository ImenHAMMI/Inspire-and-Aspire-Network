import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";

import { register } from "../js/actions/authActions";
// import "../css/signup.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    showPassword: false,
  };

  handleChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  handleClickShowPassword = () =>
    this.setState({ showPassword: !this.state.showPassword });

  handleMouseDownPassword = (e) => e.preventDefault();

  register = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };
  render() {
    const { isLoading, user } = this.props;
    return isLoading ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : user ? (
      <Redirect to="/login" />
    ) : (
      <FormControl
        // className={clsx(classes.margin, classes.textField)}
        className="formControl"
        style={{ margin: " 4% 35%" }}
        variant="outlined"
      >
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

        <h2>Time to feel like home,</h2>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          // placeholder="E-Mail required"
          defaultValue={this.state.name}
          onChange={this.handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          // placeholder="E-Mail required"
          defaultValue={this.state.email}
          onChange={this.handleChange}
        />
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ marginTop: "73%" }}
        >
          Password
        </InputLabel>
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
        {/* <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Name required"
            defaultValue={this.state.name}
            onChange={this.handleChange}
          />
        </label> */}
        {/* <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="E-Mail required"
            defaultValue={this.state.email}
            onChange={this.handleChange}
          />
        </label> */}
        {/* <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password required"
            defaultValue={this.state.password}
            onChange={this.handleChange}
          />
        </label> */}

        <button type="button" className="submit" onClick={this.register}>
          Sign Up
        </button>
      </FormControl>
    );
  }
}
const mapsStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  user: state.authReducer.user,
});
export default connect(mapsStateToProps, { register })(SignUp);
