import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
// import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";

import { isAuthorized } from "../js/actions/authActions";

import PostList from "./posts/PostList";
import UserList from "./users/UserList";
import "../css/home.css";

class Home extends React.Component {
  state = {
    anchorEl: null,
    isMenuOpen: false,
  };

  componentDidMount() {
    this.props.isAuthorized();
  }

  handleProfileMenuOpen = (e) => {
    this.state.ancherEl
      ? this.setState({ anchorEl: null, isMenuOpen: !this.state.isMenuOpen })
      : this.setState({
          anchorEl: e.currentTarget,
          isMenuOpen: !this.state.isMenuOpen,
        });
  };
  handleMenuClose = (e) => {
    this.state.ancherEl
      ? this.setState({ anchorEl: null, isMenuOpen: !this.state.isMenuOpen })
      : this.setState({
          anchorEl: e.currentTarget,
          isMenuOpen: !this.state.isMenuOpen,
        });
  };

  logOut = (e) => {
    localStorage.removeItem("token");
    this.handleMenuClose(e);
    this.props.history.push("/login");
  };
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  render() {
    const { isLoading, isAuth, profile } = this.props;
    const base64Flag = "data:image/jpeg;base64,";
    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={this.state.isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.logOut}>Log out</MenuItem>
      </Menu>
    );

    return isLoading ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : !isAuth ? (
      <CircularProgress style={{ marginTop: "17%", marginLeft: "48%" }} />
    ) : (
      // <Redirect to="/login" />
      <div>
        <div className="Grow">
          <AppBar position="static">
            <Toolbar className="Toolbar">
              {/* <IconButton
                edge="start"
                className="menuButton"
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton> */}
              <Typography
                className="title"
                style={{ width: "auto" }}
                variant="h6"
              >
                Inspire and Aspire
              </Typography>
              {/* <div className="Search">
                <div className="searchIcon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </div> */}
              <div className="Grow" />
              <div className="sectionDesktop">
                <Link to={`/profile${profile.id}`} className="Link">
                  {profile.avatar ? (
                    <Avatar
                      alt={profile.name}
                      src={
                        base64Flag +
                        this.arrayBufferToBase64(profile.avatar.img.data.data)
                      }
                      className="Avatar"
                    >
                      {profile.name.substr(0, 1).toUpperCase()}
                    </Avatar>
                  ) : (
                    <Avatar className="Avatar">
                      {profile.name.substr(0, 1).toUpperCase()}
                    </Avatar>
                  )}
                </Link>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <ArrowDropDownIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          {renderMenu}
        </div>
        <div>
          <PostList />
          {/* <UserList /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  isAuth: state.authReducer.isAuth,
  profile: state.authReducer.profile,
});
export default connect(mapStateToProps, {
  isAuthorized,
})(Home);
