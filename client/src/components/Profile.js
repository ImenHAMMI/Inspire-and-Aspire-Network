import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import { CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {
  isAuthorized,
  getProfileByID,
  follow,
  uploadImg,
  editAvatar,
} from "../js/actions/authActions";

import Post from "./posts/Post";
import ModalPost from "./ModalPost";
import ModalImg from "./ModalImg";
import "../css/profile.css";

class Profile extends React.Component {
  state = {
    file: null,
    open: false,
  };
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.isAuthorized();
    this.props.getProfileByID(id);
  }

  handleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleCloseImg = () => {
    this.handleOpen();
    this.setState({ file: null });
  };
  addFollow = (e) => {
    e.preventDefault();
    this.props.follow(this.props.profileUser.id);
  };
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  fileSelectedHandler = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      this.setState({ file: e.target.files[0], open: true });
      const formData = new FormData();
      formData.append("myImage", e.target.files[0]);
      this.props.uploadImg(formData); /**.get("myImage") */
    }
  };
  submitImgProfile = () => {
    this.props.editAvatar(this.props.imgProfile);
    this.handleOpen();
  };

  render() {
    const { isAuth, isLoading, profile, profileUser, imgProfile } = this.props;
    // console.log(imgProfile);
    const base64Flag = "data:image/jpeg;base64,";

    return !isAuth ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : isLoading || !profileUser ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : (
      <div>
        <div className="HeaderProfile">
          {imgProfile && this.state.file ? (
            <Avatar
              alt={profileUser.name}
              src={
                base64Flag + this.arrayBufferToBase64(imgProfile.img.data.data)
              }
              className="avatarProfile"
              style={{ width: 170, height: 170 }}
            ></Avatar>
          ) : profileUser.avatar ? (
            <Avatar
              alt={profileUser.name}
              src={
                base64Flag +
                this.arrayBufferToBase64(profileUser.avatar.img.data.data)
              }
              className="avatarProfile"
              style={{ width: 170, height: 170 }}
            ></Avatar>
          ) : (
            <Avatar
              className="avatarProfile"
              style={{ width: 170, height: 170 }}
            ></Avatar>
          )}
          <input
            accept="image/*"
            className="input"
            id="icon-button-file"
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <label htmlFor="icon-button-file" className="photoCamera">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <ModalImg
            open={this.state.open}
            handleOpen={this.handleOpen}
            handleCloseImg={this.handleCloseImg}
          />
          <div className="InfoProfile">
            <h1>{profileUser.name}</h1>
            <div>
              <span>{profileUser.posts.length} post</span>|
              <span>{profileUser.followers.length} followers</span>|
              <span>{profileUser.following.length} following</span>
            </div>
            <h3>Bio : </h3>
            {profile.id !== profileUser.id ? (
              <button onClick={this.addFollow}>follow</button>
            ) : null}
          </div>
        </div>

        {profileUser.posts.map((post, key) => (
          <Post key={key} postUser={post} />
        ))}
        <ModalPost open={this.props.open} handleOpen={this.props.handleOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
  isLoading: state.authReducer.loadingProfile,
  profileUser: state.authReducer.profileUser,
  imgProfile: state.authReducer.imgProfile,
});
export default connect(mapStateToProps, {
  isAuthorized,
  getProfileByID,
  follow,
  uploadImg,
  editAvatar,
})(Profile);
