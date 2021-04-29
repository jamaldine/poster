import React from "react";

import CommentAvatar from "./CommentAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import AddComment from "../../Containers/Comments/AddComment";
import Avatar from "../shared/Avatar";
import { useState } from "react";
import CommentListItemChild from "./CommentListItemChild";
import Name from "../shared/Name";
const CommentListItem = (props) => {
  const { item, postId, listOfComments, nbrComment } = props;
  const [commented, setCommented] = useState(false);
  const handleComment = () => {
    setCommented(!commented);
  };

  return (
    <div>
      {item.commentBackId === "n/a" ? (
        <div className="commentList" key={item._id}>
          <div className="comment-avatar">
            <CommentAvatar userId={item.userId} />
            <div className="comment">
              <div className="item-comment">
                <Name userId={item.userId} />
                {item.comment}
                </div>
              {commented && (
                <div className="comments replay">
                  <Avatar {...props} />
                  <AddComment
                    {...props}
                    userId={props.user.login.id}
                    postId={postId}
                    commentBackId={item._id}
                  />
                </div>
              )}
            </div>
          </div>
          {listOfComments.map((subItem) => {
            if (item._id === subItem.commentBackId) {
              return (
                <div key={subItem._id}>
                  <CommentListItemChild
                    {...props}
                    item={subItem}
                    postId={props.postId}
                    listOfComments={listOfComments}
                    nbrComment={nbrComment}
                  />
                </div>
              );
            }
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CommentListItem;
