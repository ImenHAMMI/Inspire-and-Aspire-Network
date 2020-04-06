import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import { isAuthorized } from "../js/actions/action";
import Avatar from "@material-ui/core/Avatar";

class Profile extends React.Component {
  // componentDidMount() {
  //   this.props.isAuthorized();
  // }
  render() {
    const { profile } = this.props;
    return (
      // !isAuth ? (
      //   <Redirect to="/login" />
      // ) : (
      <div>
        {profile ? (
          <div>
            <Avatar alt={profile.name} src={profile.avatar} className="Avatar">
              {profile.name}
            </Avatar>
            {profile.name}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
});
export default connect(mapStateToProps, { isAuthorized })(Profile);
