import React from "react";
import axios from "axios";
class Name extends React.Component {

  state={
    fullname:''
  }
  async componentWillMount() {
    await axios
      .get(`http://localhost:3001/api/oneuser?id=${this.props.userId}`, {
        withCredentials: true,
      })
      .then((response) =>
        this.setState({
          fullname: response.data,
        })
      );
  }

  render() {
    return (
      <div className="comment-name">
        {this.state.fullname.name} {this.state.fullname.lastname}
      </div>
    );
  }
}
export default Name;
