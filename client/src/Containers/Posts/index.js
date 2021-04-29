import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { logout } from "../../actions/user";
import { allPosts, getUser } from "../../actions/post";
import { users } from "../../actions/user";
import Post from "../../Components/Posts/post";
import "./post.css";

class Posts extends React.Component {

  logOut = () => {
    this.props.history.push("/logout");
  };

  componentDidMount() {
    this.props.allPosts();
    this.props.users();
  }

  getUserById(id, getUser) {
    getUser(id);
  }

  render() {
    return (
      <Post
      {...this.props}
      logOut={this.logOut}
      getUserById={this.getUserById}
    />
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    post: state.post,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout,
      allPosts,
      getUser,
      users
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
