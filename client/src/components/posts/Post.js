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
  // getAvatarsLike,
} from "../../js/actions/postActions";
import "./css/post.css";
// import photo from "../../gallery/IMG_20190319_151824.jpg";
import idea3 from "../../gallery/boy-1454054_640.png";

// import { getProfileByID } from "../js/actions/authActions";

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
    const {
      name,
      title,
      text,
      quote,
      date,
      likedBy,
      avatarsLikesImg,
    } = this.props.postUser;
    const { profile, isLoading, post } = this.props;
    const isLiked = likedBy.findIndex((el) => el._id === profile.id); //likedBy.indexOf(profile.id);
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

            <CardHeader title={name} subheader={date.substr(0, 10)} />
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
              {avatarsLikesImg.map((el, key) =>
                el.img ? (
                  <Avatar
                    key={key}
                    alt="imgProfile"
                    src={
                      base64Flag + this.arrayBufferToBase64(el.img.data.data)
                    }
                  />
                ) : (
                  <Avatar key={key}>{el.substr(0, 1).toUpperCase()}</Avatar>
                )
              )}
              }
            </AvatarGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.postReducer.post,
  isLoading: state.postReducer.isLoading,
  profile: state.authReducer.profile,
  avatarsLikes: state.postReducer.avatarsLikes,
});
export default connect(mapStateToProps, {
  likePost,
  unLikePost,
})(Post);
