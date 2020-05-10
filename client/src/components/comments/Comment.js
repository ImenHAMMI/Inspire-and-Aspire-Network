import React from "react";

import Avatar from "@material-ui/core/Avatar";

import "./css/comment.css";

class Comment extends React.Component {
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  render() {
    const { text, name, date, avatarImg } = this.props.comment;
    const base64Flag = "data:image/jpeg;base64,";
    return (
      <div className="Comment">
        {avatarImg ? (
          <Avatar
            alt={name}
            src={base64Flag + this.arrayBufferToBase64(avatarImg.img.data.data)}
          ></Avatar>
        ) : (
          <Avatar>{name.substr(0, 1).toUpperCase()}</Avatar>
        )}
        <p>{text}</p>
      </div>
    );
  }
}

export default Comment;
