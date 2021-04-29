import React from "react";
import axios from "axios";

import "./CommentList.scss";

import CommentListItem from "./CommentListItem";

class CommentList extends React.Component {
  state = {
    listOfComments: [],
    nbrComment: 0,
    commentlists: [],
    commentlistwithoutNA: [],
    result: [],
    listItems: [],
    last: [],
  };
  async componentWillMount() {
    await axios
      .get(
        `http://localhost:3001/api/postComments?order=-1&postId=${this.props.postId}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          listOfComments: response.data.doc,
        });
        this.state.listOfComments.forEach((element) => {
          if (element.commentBackId === "n/a") {
            this.setState({
              commentlistwithoutNA: [
                ...this.state.commentlistwithoutNA,
                element,
              ],
            });
          }
        });
        this.state.commentlistwithoutNA.map(async (item) => {
          this.setState({
            result: [],
          });
          this.commentById(item._id);
          this.setState({
            commentlists: [
              ...this.state.commentlists,
              { item, res: this.state.result },
            ],
          });
        });
      });
  }

  commentById = (id) => {
    this.setState({
      last: [],
    });
    this.state.listOfComments.map((element) => {
      if (element.commentBackId === id) {
        this.setState({
          listItems: element,
        });

        this.state.listOfComments.map((elementx) => {
          if (elementx.commentBackId === element._id) {
            this.setState({
              last: [...this.state.last, elementx],
            });
          }
        });

        this.setState({
          listItems: [this.state.listItems, { branch: this.state.last }],
        });

        return this.setState({
          result: [...this.state.result, this.state.listItems],
        });
      }
    });
  };

  render() {
    return <div className="commentLists">
    {this.state.listOfComments.map((item) => {
      return (
        <div key={item._id}>
          <CommentListItem
            {...this.props}
            item={item}
            postId={this.props.postId}
            listOfComments={this.state.listOfComments}
            nbrComment={this.state.nbrComment}
          />
        </div>
      );
    })}
  </div>
  }
}
export default CommentList;
