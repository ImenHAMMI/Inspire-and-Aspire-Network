import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllUsers } from "../../store/actions/authActions";

import User from "./User";
import "./css/userList.css";

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users, profile } = this.props;
    // console.log(users);
    return (
      <div className="userList">
        {users.map((user, key) =>
          user._id !== profile.id ? <User key={key} user={user} /> : null
        )}
      </div>
    );
  }
}
const mapSTP = (state) => ({
  users: state.authReducer.users,
  profile: state.authReducer.profile,
});
export default connect(mapSTP, {
  getAllUsers,
})(UserList);
