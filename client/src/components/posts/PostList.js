import React, { Component } from "react";
import { connect } from "react-redux";

import Post from "./Post";
import { getPosts } from "../../js/actions/postActions";
import "./css/postList.css";
class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props;
    return (
      <div className="postList">
        {posts.map((post, key) => (
          <Post key={key} postUser={post} name={post.name} />
        ))}
      </div>
    );
  }
}
const mapSTP = (state) => ({
  posts: state.postReducer.posts,
});
export default connect(mapSTP, {
  getPosts,
})(PostList);
