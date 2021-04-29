import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

import { userPosts } from "../../actions/post";
import "./PostNumber.scss";

class PostNumber extends Component {
  state = {
    numberOfPosts: 0,
  };

  componentWillMount() {
    axios
      .get(
        `http://localhost:3001/api/userPosts?order=-1&id=${this.props.userIdItem}`,
        { withCredentials: true }
      )
      .then((response) =>
        this.setState({
          numberOfPosts: response.data.numberOfPosts,
        })
      );
  }
  render() {
    return (
      <div className="postNumber">
        <div className="number">{this.state.numberOfPosts}</div>
        <div className="post"> Post</div>
      </div>
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
      userPosts,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNumber);
