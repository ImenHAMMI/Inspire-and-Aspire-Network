import React from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";

import { addComment } from "../../store/actions/postActions";
import "./css/addcomment.css";

class AddComment extends React.Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  addComment = (e) => {
    e.preventDefault();
    if (this.state.text) {
      this.props.addComment(this.props.id, this.state);
    }
    this.setState({ text: "" });
  };
  render() {
    const { profile } = this.props;
    const base64Flag = "data:image/jpeg;base64,";
    return (
      <form className="Comment" onSubmit={this.addComment}>
        {profile.avatar ? (
          <Avatar
            alt={profile.name}
            src={
              base64Flag +
              this.arrayBufferToBase64(profile.avatar.img.data.data)
            }
            className="profileAvatar"
          ></Avatar>
        ) : (
          <Avatar>{profile.name.substr(0, 1).toUpperCase()}</Avatar>
        )}
        <input
          placeholder="add a comment"
          value={this.state.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.authReducer.profile,
});
export default connect(mapStateToProps, {
  addComment,
})(AddComment);
