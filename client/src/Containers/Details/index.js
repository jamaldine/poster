import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { logout } from "../../actions/user";
import { allPosts, getUser } from "../../actions/post";
import { users } from "../../actions/user";
import { getPost } from "../../actions/post";

import PostDetails from "../../Components/Posts/PostDetails";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    const {match: {params}} = this.props;
    let id = params.id;
    this.props.getPost(params.id);
  }
  logOut = () =>{
    this.props.history.push("/logout");
  }
  render() {
    return <PostDetails {...this.props} logOut={this.logOut} />;
  }
}

function mapStateToProps(state) {
  return {
    singlePost: state.post.getPost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPost
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
