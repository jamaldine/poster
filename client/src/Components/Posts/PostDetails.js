import React from "react";
import PostItemHeader from "./PostItemHeader";
import PostCaroussel from "./PostCaroussel";
import Avatar from "../shared/Avatar";
import AddComment from "../../Containers/Comments/AddComment";
import CommentList from "../Comments/CommentList";
import Loading from "../shared/Loading";
import { faCompressArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import "./PostDetails.scss";

const PostDetails = (props) => {
  const { singlePost } = props;
  return (
    <div className="postDetails">
      {singlePost ? (
        /*<div className="thePoster">
          <div className="posts">
            <div className="postList">*/
              <div className="postItem" key={singlePost.id}>
                <PostItemHeader
                  userId={singlePost.userId}
                  {...props}
                  icons={faCompressArrowsAlt}
                />
                <div className="postContainer">
                  <div className="postItem-title">{singlePost.title}</div>
                  <div className="postItem-content">{singlePost.content}</div>
                  {singlePost.img.length > 0 ? (
                    <div className="postItem-medias">
                      <PostCaroussel images={singlePost.img} />
                    </div>
                  ) : null}
                  <div className="comments">
                    <Avatar {...props} />
                    <AddComment
                      {...props}
                      userId={props.user.login.id}
                      postId={singlePost._id}
                    />
                  </div>
                  <div className="commentsList">
                    <CommentList
                      {...props}
                      postId={singlePost._id}
                      item={singlePost}
                    />
                  </div>
                </div>
              </div>
            /*</div>
          </div>
                  </div>*/
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PostDetails;
