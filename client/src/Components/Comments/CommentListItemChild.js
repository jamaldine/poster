import React from "react";

import CommentAvatar from "./CommentAvatar";
import { useState } from "react";
import CommentListItem from "./CommentListItem";
const CommentListItemChild = (props) => {
  const { item, postId, listOfComments, nbrComment } = props;
  const [commented, setCommented] = useState(false);
  return (
    <div className="commentList child" key={item._id}>
      <div className="comment-avatar">
        <CommentAvatar userId={item.userId} />
        <div className="comment">
          <div className="item-comment">{item.comment}</div>
        </div>
      </div>
      {listOfComments.map((subItem) => {
        if (subItem._id === item.commentBackId)
          return (
            <div key={subItem._id}>
              <CommentListItem
                item={item}
                postId={postId}
                listOfComments={listOfComments}
              />
            </div>
          );
      })}
    </div>
  );
};

export default CommentListItemChild;
