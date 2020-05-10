import React from "react";

import Comment from "./Comment";
import "./css/addcomment.css";

class CommentList extends React.Component {
  render() {
    const { comments } = this.props;

    return comments.map((comment, key) => (
      <Comment key={key} comment={comment} />
    ));
  }
}

export default CommentList;
