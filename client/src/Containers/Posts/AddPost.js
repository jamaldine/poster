import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormAddPost from "../../Widgets/FormAddPost/FormAddPost";
import { addPost } from "../../actions/post";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPostData: {
        title: {
          value: "",
          label: false,
          labelText: "Title",
          element: "input",
          config: {
            type: "text",
            name: "title",
            placeholder: "Title",
          },
          validation: {
            required: false,
          },
          valid: true,
          validationMessage: "",
          touched: false,
        },
        content: {
          value: "",
          label: false,
          labelText: "Content",
          element: "textarea",
          config: {
            type: "text",
            name: "content",
            placeholder: "Content here ...",
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
      acceptedFiles: [],
    };
  }
componentWillReceiveProps(nextProps){
  if(nextProps.post.addPost?.post){
    console.log(this.props)
    this.props.users();
  }
}
  submitAddPost = (e) => {
    //e.preventDefault();
    const dataToSend2 = new FormData();
    dataToSend2.set("title", this.state.addPostData.title.value);
    dataToSend2.set("content", this.state.addPostData.content.value);
    dataToSend2.set("video", "");
    dataToSend2.set("userId", this.props.user.login.id);
    if (this.state.acceptedFiles.length > 0) {
      for (let i = 0; i < this.state.acceptedFiles.length; i += 1) {
        dataToSend2.append("file", this.state.acceptedFiles[i]);
      }
    }
    this.props.addPost(dataToSend2);
    //this.props.allPosts();
    alert('hahahahhahahahahh');
  };

  onImageDrop = (acceptedFiles) => {
    this.setState({
      acceptedFiles,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var addPostDataNested = { ...this.state.addPostData };
    if (name === this.state.addPostData.title.config.name) {
      addPostDataNested.title.value = value;
      this.setState({ addPostDataNested });
    }
    if (name === this.state.addPostData.content.config.name) {
      addPostDataNested.content.value = value;
      this.setState({ addPostDataNested });
    }
  };
  render() {
    return (
      <FormAddPost
        addPostData={this.state.addPostData}
        submitAddPost={this.submitAddPost}
        handleChange={this.handleChange}
        onImageDrop={this.onImageDrop}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    addingPost: state.post.addPost
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addPost,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
