import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import { CircularProgress } from "@material-ui/core";

import {
  isAuthorized,
  getProfileByID,
  follow,
} from "../js/actions/authActions";

import Post from "./Post";
import ModalPost from "./ModalPost";

class Profile extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.getProfileByID(id);
    this.props.isAuthorized();
  }
  addFollow = (e) => {
    e.preventDefault();
    this.props.follow(this.props.profileUser.id);
  };
  render() {
    const { isAuth, isLoading, profile, profileUser } = this.props;

    // console.log(this.props);
    return isLoading ? (
      <CircularProgress />
    ) : !isAuth ? (
      <CircularProgress />
    ) : (
      <div>
        <Avatar
          alt={profileUser.name}
          src={profileUser.avatar}
          className="Avatar"
        >
          {profileUser.name}
        </Avatar>
        {profileUser.name}
        {profile.id !== profileUser.id ? (
          <button onClick={this.addFollow}>follow</button>
        ) : null}
        {profileUser.posts.map((post, key) => (
          <Post key={key} post={post} name={profileUser.name} />
        ))}
        <ModalPost open={this.props.open} handleOpen={this.props.handleOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
  isLoading: state.authReducer.isLoading,
  profileUser: state.authReducer.profileUser,
});
export default connect(mapStateToProps, {
  isAuthorized,
  getProfileByID,
  follow,
})(Profile);
