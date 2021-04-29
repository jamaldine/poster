import React, { useState } from "react";
import Avatar from "../shared/Avatar";
import PostActions from "./PostActions";
import "./PostHeader.scss";

const PostHeader = (props) => {
  const { logOut } = props;
  const [actions, setActions] = useState(false);
  const togglePopin = () => {
    setActions(!actions);
  };

  const refreshPost = () => {
    props.history.push("/");
  };

  return (
    <div className="header">
      <div className="test">
        <div className="thePoster" onClick={refreshPost}>
          THE POSTER
        </div>
        <div className="navHeader">
          <div className="header-avatar-position">
            <Avatar {...props} togglePopin={togglePopin} />
          </div>
          <PostActions
            logOut={logOut}
            actions={actions}
            {...props}
            togglePopin={togglePopin}
          />
        </div>
      </div>
    </div>
  );
};
export default PostHeader;
