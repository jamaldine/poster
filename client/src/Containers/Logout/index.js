import React, { Component } from "react";
import axios from "axios";
import Loading from "../../Components/shared/Loading";
class Logout extends Component {
    componentDidMount(){
        const request = axios
        .get(`http://localhost:3001/api/logout`, { withCredentials: true } )
        .then((response) => 
            setTimeout(() => {
                this.props.history.push('/');
            }, 2000)
        );
    }
    render(){
        return <Loading />;
    }
}

export default Logout;