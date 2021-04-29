import React from "react";
import axios from "axios";

import "./CommentNumber.scss";

class CommentNumber extends React.Component {
  state = {
    numberOfComments: 0,
  };

  componentWillMount() {
    axios
      .get(
        `http://localhost:3001/api/userComments?order=-1&userId=${this.props.userIdItem}`,
        { withCredentials: true }
      )
      .then((response) =>
        this.setState({
          numberOfComments: response.data.numberOfComments,
        })
      );
  }

  render() {
    return (
      <div className="commentNumber">
        <div className="number">{this.state.numberOfComments}</div>{" "}
        <div className="comment">Comment</div>
      </div>
    );
  }
}

export default CommentNumber;
