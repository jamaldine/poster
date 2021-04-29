import React, { Component } from "react";
import axios from 'axios';
//import avatar from "./DSC_0010.jpg";
import "./PostItemHeader.scss";
import PostNumber from "./PostNumber";
import CommentNumber from "../Comments/CommentNumber";

import { PATH_IMAGES } from "../../utils/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class PostItemHeader extends Component {



  state={
    avatar:null
  }
  async componentDidMount(){
    await axios
    .get(
      `http://localhost:3001/api/getUser?id=${this.props.userId}`,
      { withCredentials: true }
    )
    .then((response) =>
      this.setState({
        avatar: response.data,
      })
    );
  }
  render(){

  

  const { userId, showDetails, id, icons } = this.props;
  const { users } = this.props.user;

  const ss = () => {
    if (icons.iconName === "expand-arrows-alt") showDetails(id);
    if (icons.iconName === "compress-arrows-alt") this.props.history.push('/');
  } 
  return (
    <div className="postItem-genaralInfo">
      {users
        ? users.length !== 0
          ? users.map((item) => {
              if(item._id === userId){
              return (
                <div className="postItemHeader" key={item._id}>
                  <div className="postItem-avatar">
                    <div className="postItem-avatar-position">
                      <img
                        className="avatarImg"
                        src={PATH_IMAGES + "account/" + this.state.avatar?.doc.avatar}
                        alt="jamal dine boukir"
                      />
                    </div>
                  </div>
                  <div className="postItem-avatarInfo">
                    {item._id === userId ? (
                      <div className="avatar-name" key={item._id}>
                        {item.name} {item.lastname}
                      </div>
                    ) : null}

                    <div className="avatar-rate">
                      <div className="avatar-rate-post">
                        <PostNumber key={item._id} userIdItem={item._id} />
                      </div>
                      <div className="avatar-rate-comment">
                        <CommentNumber key={item._id} userIdItem={item._id} />
                      </div>
                    </div>
                  </div>
                  <div className="toexpand" ><FontAwesomeIcon onClick={ss} icon={icons} className="expands" /></div>
                </div>
              );
                    }
            })
          : null
        : null}
    </div>
  );
}
}
export default PostItemHeader;
