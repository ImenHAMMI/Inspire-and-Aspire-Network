import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import User from "./User";
import { getAllUsers } from "../../js/actions/authActions";
class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users, profile } = this.props;
    return (
      <div>
        {users.map((user, key) =>
          user._id !== profile.id ? (
            <div key={key}>
              <p>{user.name}</p>
              <Link to={`/profile${user._id}`}>view profile</Link>
            </div>
          ) : null
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
