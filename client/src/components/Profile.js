import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import { CircularProgress } from "@material-ui/core";

import { isAuthorized } from "../js/actions/authActions";

import Post from "./Post";
import ModalPost from "./ModalPost";

class Profile extends React.Component {
  componentDidMount() {
    this.props.isAuthorized();
  }
  render() {
    const { isLoading, isAuth, profile } = this.props;
    // const { name, avatar, posts } = this.props.profile;
    console.log(this.props);
    return isLoading ? (
      <CircularProgress />
    ) : (
      <div>
        <Avatar alt={profile.name} src={profile.avatar} className="Avatar">
          {profile.name}
        </Avatar>
        {profile.name}
        {profile.posts.map((post, key) => (
          <Post key={key} post={post} name={profile.name} />
        ))}
        <ModalPost open={this.props.open} handleOpen={this.props.handleOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
  isLoading: state.postReducer.isLoading,
  // posts: state.postReducer.posts,
});
export default connect(mapStateToProps, { isAuthorized })(Profile);
