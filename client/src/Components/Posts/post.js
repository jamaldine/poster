import React from "react";

import PostItem from "./PostItem";
import AddPost from "../../Containers/Posts/AddPost";
import "./post.scss";

const Post = (props) => {
  return (
    <div className="thePoster">
      <div className="posts">
        <div className="postList">
          <PostItem {...props} />
        </div>
        <div className="addPost">
          <AddPost {...props} />
        </div>
      </div>
    </div>
  );
};

export default Post;
