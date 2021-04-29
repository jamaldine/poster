import React from "react";

import "./FormAddComment.scss";

const FormAddComment = (props) => {
  const { addCommentData, submitAddComment, handleChange, postId, userId } = props;

  const templateAddPost = () => {
    let data = [];
    for (let item in addCommentData) {
      data.push({ id: item, detail: addCommentData[item] });
    }
    return data.map((item) => {
      return (
        <div key={item.id} className="title-content">
          {item.detail.element === "input" ? (
            <input className={item.id} {...item.detail.config} onChange={handleChange} />
          ) : null}
        </div>
      );
    });
  };

  return (
    <form onSubmit={submitAddComment} className="FormAddComment">
      {templateAddPost()}
    </form>
  );
};

export default FormAddComment;
