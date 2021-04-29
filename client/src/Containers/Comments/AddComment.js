import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormAddComment from "../../Widgets/FormAddComment/FormAddComment";

import { addComment } from "../../actions/comment";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCommentData: {
        comment: {
          value: "",
          label: false,
          labelText: "Comment",
          element: "input",
          config: {
            type: "text",
            name: "comment",
            placeholder: "comment here ...",
          },
          validation: {
            required: false,
          },
          valid: false,
          validationMessage: "",
          touched: false,
        },
      },
      formData: null,
    };
  }

  submitAddComment = (e) => {
    //e.preventDefault();
    const { userId, postId, commentBackId } = this.props;
    const data = {
      comment: this.state.addCommentData.comment.value,
      userId,
      postId,
      commentBackId
    };
    this.props.addComment(data);
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var addCommentDataNested = { ...this.state.addCommentData };
    if (name === this.state.addCommentData.comment.config.name) {
      addCommentDataNested.comment.value = value;
      this.setState({ addCommentDataNested });
    }
  };

  render() {
    return (
      <FormAddComment
        addCommentData={this.state.addCommentData}
        submitAddComment={this.submitAddComment}
        handleChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addComment,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
