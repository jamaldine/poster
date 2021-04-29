import React from "react";
import axios from "axios";

import { PATH_IMAGES } from "../../utils/config";
import './ComponentAvatar.scss';

class PostEvent extends React.Component {
  state = {
    image: [],
  };
  async componentWillMount() {
    await axios
      .get(`http://localhost:3001/api/getAvatarUser?id=${this.props.userId}`, {
        withCredentials: true,
      })
      .then((response) =>
        this.setState({
          image: response.data,
        })
      );
  }

  render() {
    return (
      <div className="componentAvatar">
        <img className='avatar-c' src={PATH_IMAGES + "account/" + this.state.image.avatar} />
      </div>
    );
  }
}
export default PostEvent;
