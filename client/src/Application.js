import axios from "axios";
import React, { Component } from "react";


class Application extends Component {
 
    componentWillMount(){
        axios.get('http://localhost:3001/api/comments')
        .then(response => {console.log(response.data)})
        .catch()
    }

  render() {
    return (
      <div>hello</div>
    );
  }
}


export default Application;
