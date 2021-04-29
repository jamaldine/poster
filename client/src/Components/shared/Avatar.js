import React from "react";

import { PATH_IMAGES } from "../../utils/config"
import "./Avatar.scss"

const Avatar = (props) => {
    const { togglePopin } = props;
  return(
  <div className="avatar">
    {props.user.login?.avatar ? (
      <img
        className="headerAvatarImg"
        src={PATH_IMAGES + "account/" + props.user.login?.avatar}
        alt="the poster"
        onClick={togglePopin}
      />
    ) : (
      <div onClick={togglePopin} className="headerAvatarLetters">
        {props.user.login?.lastname?.substring(0, 1)}
        {props.user.login?.name?.substring(0, 1)}
      </div>
    )}
  </div>
  )
};

export default Avatar;
