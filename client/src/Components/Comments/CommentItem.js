import React from "react";

const CommentItem = (props) => {
  let buffer = [];
  let list = [];
  const test = (element) => {
    list = [];
    element?.map((sub1) => {
      buffer.push(
        <h4>
          {sub1.comment}

          {sub1.branch?.map((br) => {
            list.push(<h6>{br.comment}</h6>);
          })}

          {list}
        </h4>
      );
    });
    buffer.pop();
  };

  return (
    <div>
      {props.commentlists.map((item) => (
        <div>
          <h1>{item.item.comment}</h1>
          {item.res?.forEach((element) => {
            test(element);
          })}
          <div>{buffer}</div>
        </div>
      ))}
    </div>
  );
};
export default CommentItem;
