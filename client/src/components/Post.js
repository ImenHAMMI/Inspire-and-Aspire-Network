import React from "react";
import { connect } from "react-redux";

// import { makeStyles } from '@material-ui/core/styles';
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { CircularProgress } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import "../css/post.css";
import {
  likePost,
  unLikePost,
  getAvatarsLike,
} from "../js/actions/postActions";
// import { getProfileByID } from "../js/actions/authActions";
// const useStyles = makeStyles((theme) => ({
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

class Post extends React.Component {
  // componentDidMount() {
  //   const id = this.props.postUser._id;
  //   // this.props.getAvatarsLike(id);
  // }
  addLike = (e) => {
    e.preventDefault();
    const id = this.props.postUser._id;
    this.props.likePost(id);
  };
  removeLike = (e) => {
    e.preventDefault();
    const id = this.props.postUser._id;
    this.props.unLikePost(id);
  };
  render() {
    const { text, date, likedBy } = this.props.postUser;
    const { name, profile, isLoading, post, avatarsLikes } = this.props;
    const isLiked = likedBy.indexOf(profile.id);

    // console.log(this.props.avatarsLikes);

    return (
      //   const classes = useStyles();
      //   const [expanded, setExpanded] = React.useState(false);

      //   const handleExpandClick = () => {
      //     setExpanded(!expanded);
      //   };

      <Card className="postCard">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className="avatar">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={date}
        />
        {/* <CardMedia
        className="media"
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {isLiked < 0 ? (
            <IconButton aria-label="add to favorites" onClick={this.addLike}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="add to favorites" onClick={this.removeLike}>
              <FavoriteIcon className="Like" />
            </IconButton>
          )}

          <IconButton aria-label="add comments">
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
        </CardActions>

        <AvatarGroup max={3}>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        </AvatarGroup>
        <Collapse timeout="auto" unmountOnExit>
          {/* in={expanded} */}
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
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
