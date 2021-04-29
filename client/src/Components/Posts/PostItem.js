import React from "react";

import PostItemHeader from "./PostItemHeader";
import PostCaroussel from "./PostCaroussel";
import "./PostItem.scss";

import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";

const PostItem = (props) => {
  const { allPosts } = props.post;
  const showDetails = (id) => {
    props.history.push("/details/id=" + id);
  };

  return (
    <div className="postItems">
      {allPosts?.length > 0 ? (
        allPosts.map((item) => {
          return (
            <div className="postItem" key={item._id}>
              <PostItemHeader
                userId={item.userId}
                {...props}
                id={item._id}
                showDetails={showDetails}
                icons={faExpandArrowsAlt}
              />
              <div className="postContainer">
                <div
                  className="postItem-title"
                  onClick={() => showDetails(item._id)}
                >
                  {item.title}
                </div>
                <div className="postItem-content">{item.content}</div>
                {item.img.length > 0 ? (
                  <div className="postItem-medias">
                    <PostCaroussel images={item.img} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-item">No available posts</div>
      )}
    </div>
  );
};

export default PostItem;
