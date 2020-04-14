import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";

import { isAuthorized, getAllUsers } from "../js/actions/authActions";
import { getPosts } from "../js/actions/postActions";

import Post from "./Post";
import "../css/home.css";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.isAuthorized()) {
      this.props.getPosts();
      this.props.getAllUsers();
    }
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    const { isLoading, isAuth, profile, posts, users } = this.props;
    return isLoading ? (
      <CircularProgress />
    ) : !isAuth ? (
      <Redirect to="/login" />
    ) : (
      <div>
        <Link to={`/profile${profile.id}`}>
          <Avatar alt={profile.name} src={profile.avatar} className="Avatar">
            {profile.name}
          </Avatar>
        </Link>
        <button onClick={this.logOut}>log out</button>
        {posts.map((post, key) => (
          <Post key={key} postUser={post} name={post.name} />
        ))}
        {users.map((user, key) =>
          user._id !== profile.id ? (
            <div key={key}>
              <p>{user.name}</p>
              <Link to={`/profile${user._id}`}>view profile</Link>
            </div>
          ) : null
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
  users: state.authReducer.users,
  posts: state.postReducer.posts,
});
export default connect(mapStateToProps, {
  isAuthorized,
  getPosts,
  getAllUsers,
})(Home);
