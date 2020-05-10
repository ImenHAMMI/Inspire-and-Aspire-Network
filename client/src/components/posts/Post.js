import React from "react";
import { connect } from "react-redux";

// import { makeStyles } from '@material-ui/core/styles';
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { CircularProgress } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import {
  likePost,
  unLikePost,
  editPost,
  deletePost,
} from "../../store/actions/postActions";

import ModalEditPost from "./ModalEditPost";
import AddComment from "../comments/AddComment";
import CommentList from "../comments/CommentList";
import "./css/post.css";
import idea3 from "../../gallery/boy-1454054_640.png";

class Post extends React.Component {
  addLike = (e) => {
    e.preventDefault();
    const { _id } = this.props.postUser;
    this.props.likePost(_id);
  };

  removeLike = (e) => {
    e.preventDefault();
    const { _id } = this.props.postUser;
    this.props.unLikePost(_id);
  };
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    const { profile, postUser } = this.props;
    const {
      _id,
      postedBy,
      title,
      text,
      quote,
      date,
      likedBy,
      comments,
      avatarsLikesImg,
    } = postUser;
    // console.log(postUser);
    const isLiked = likedBy.findIndex((el) => el._id === profile.id);
    // console.log(isLiked);
    const base64Flag = "data:image/jpeg;base64,";

    return (
      <div className="Card">
        <img className="idea" src={idea3}></img>
        <div className="postCard">
          {profile.avatar ? (
            <Avatar
              alt={profile.name}
              src={
                base64Flag +
                this.arrayBufferToBase64(profile.avatar.img.data.data)
              }
              className="profileAvatar"
              style={{ width: 170, height: 170 }}
            ></Avatar>
          ) : (
            <Avatar
              className="profileAvatar"
              style={{ width: 170, height: 170 }}
            ></Avatar>
          )}
          <div>
            <div className="header">
              <Typography
                className="Quote right-in"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <span className="large_comma">“</span>
                {quote}
                <span className="large_comma">”</span>
              </Typography>
              <TrendingUpIcon
                className="Trending_Up_Icon"
                style={{ fontSize: "150px" }}
              />
            </div>

            <h3>{title}</h3>
            <Typography
              className="experience"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {text}
            </Typography>

            <CardHeader title={postedBy.name} subheader={date.substr(0, 10)} />
            <CardActions disableSpacing>
              {isLiked < 0 ? (
                <IconButton
                  aria-label="add to favorites"
                  onClick={this.addLike}
                >
                  <i className="far fa-lightbulb"></i>
                  {/* <FavoriteIcon /> */}
                </IconButton>
              ) : (
                <IconButton
                  aria-label="add to favorites"
                  onClick={this.removeLike}
                >
                  <i className="fas fa-lightbulb Inspired"></i>
                </IconButton>
              )}

              <IconButton aria-label="add comments">
                <CommentIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              {postedBy._id === profile.id ? (
                <div>
                  <ModalEditPost postUser={postUser} />
                  {/* <button onClick={() => this.props.editPost(_id)}>Edit</button> */}
                  <button onClick={() => this.props.deletePost(_id)}>
                    Delete
                  </button>
                </div>
              ) : null}
            </CardActions>

            {/* action={ */}
            {/* //     <IconButton aria-label="settings">
              //       <MoreVertIcon />
              //     </IconButton>
              //   }
              //   title={profile.name}
              //   subheader={date}
              // /> */}
            <AvatarGroup max={5}>
              {avatarsLikesImg // case adding new post
                ? avatarsLikesImg.map((el, key) =>
                    el.img ? (
                      <Avatar
                        key={key}
                        alt="imgProfile"
                        src={
                          base64Flag +
                          this.arrayBufferToBase64(el.img.data.data)
                        }
                      />
                    ) : (
                      <Avatar key={key}>{el.substr(0, 1).toUpperCase()}</Avatar>
                    )
                  )
                : null}
              }
            </AvatarGroup>
            <CommentList comments={comments} />
            <AddComment id={_id} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.authReducer.profile,
});
export default connect(mapStateToProps, {
  likePost,
  unLikePost,
  editPost,
  deletePost,
})(Post);
