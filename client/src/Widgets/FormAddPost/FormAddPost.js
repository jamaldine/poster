import React from "react";

import DropZone from "../../Components/Posts/DropZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./FormAddPost.scss";

const FormAddPost = (props) => {
  const { addPostData, submitAddPost, handleChange, onImageDrop } = props;

  const templateAddPost = () => {
    let data = [];
    for (let item in addPostData) {
      data.push({ id: item, detail: addPostData[item] });
    }
    return data.map((item) => {
      return (
        <div key={item.id} className="title-content">
          {item.detail.element === "input" ? (
            <input className={item.id} {...item.detail.config} onChange={handleChange} />
          ) : null}
          {item.detail.element === "textarea" ? (
            <textarea className={item.id} {...item.detail.config} onChange={handleChange} />
          ) : null}
        </div>
      );
    });
  };

  return (
    <form onSubmit={submitAddPost} className="FormAddPost">
      {templateAddPost()}
      <div className="dropZone">
        <DropZone onImageDrop={onImageDrop} />
      </div>
      <button className="addPost-btn" disabled={addPostData.content.value === "" || addPostData.title.value === ""}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default FormAddPost;
