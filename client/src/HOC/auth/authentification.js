import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { auth, users } from "../../actions/user";
import Loading from "../../Components/shared/Loading";

export default function (Composer, reload) {
  class Authentification extends Component {
    state = {
      loading: true,
      dateStart: 0,
    };
    componentDidMount() {
      this.props.auth();
      this.props.users();
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        loading: false,
      });
      if (!nextProps.user.login?.isAuth) {
        if (reload) this.props.history.push("/login");
      } else {
        this.setState({
          dateStart: new Date(),
        });

        if (reload === false) {
          localStorage.setItem("email", nextProps.user.login.email);
          this.props.history.push("/");
        }
      }
    }
    render() {
      if (this.state.loading === true) return <Loading />;
      return (
        <Composer
          {...this.props}
          user={this.props.user}
          dateStart={this.state.dateStart}
          uses={this.props.users}
        />
      );
    }
  }
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        auth,
        users,
      },
      dispatch
    );
  }
  return connect(mapStateToProps, mapDispatchToProps)(Authentification);
}
