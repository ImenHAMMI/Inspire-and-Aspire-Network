import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";

import "./css/user.css";

class User extends React.Component {
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    const { img, avatar } = this.props.user;
    const { _id, name } = avatar;
    const base64Flag = "data:image/jpeg;base64,";
    // console.log(this.props.user);
    return (
      <Link to={`/profile${_id}`}>
        {img ? (
          <div className="User">
            <Avatar
              alt="imgProfile"
              src={base64Flag + this.arrayBufferToBase64(img.data.data)}
            />
            <p>{name}</p>
          </div>
        ) : (
          <div className="User">
            <Avatar>{name.substr(0, 1).toUpperCase()}</Avatar>
            <p>{name}</p>
          </div>
        )}
      </Link>
    );
  }
}

export default User;
