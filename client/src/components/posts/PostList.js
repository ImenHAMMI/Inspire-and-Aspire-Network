import React, { Component } from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import Post from "./Post";
import { getPosts } from "../../store/actions/postActions";
import "./css/postList.css";

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, isLoading } = this.props;
    console.log(posts);
    return isLoading ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : (
      <div className="postList">
        {posts.map((post, key) => (
          <Post key={key} postUser={post} />
        ))}
      </div>
    );
  }
}
const mapSTP = (state) => ({
  posts: state.postReducer.posts,
  isLoading: state.postReducer.isLoading,
});
export default connect(mapSTP, {
  getPosts,
})(PostList);
