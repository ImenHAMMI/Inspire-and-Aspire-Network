import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";

import { isAuthorized } from "../js/actions/action";
import "../css/home.css";

class Home extends React.Component {
  componentDidMount() {
    this.props.isAuthorized();
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    const { isLoading, isAuth, profile } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : (
      <div>
        <Link to="/profile">
          <Avatar alt={profile.name} src={profile.avatar} className="Avatar">
            {profile.name}
          </Avatar>
        </Link>
        <button onClick={this.logOut}>log out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
});
export default connect(mapStateToProps, { isAuthorized })(Home);
