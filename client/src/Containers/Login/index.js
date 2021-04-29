import React, { Component } from "react";
import FormLogin from "../../Widgets/formLogin/formLogin";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../actions/user";
import { NavItem } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        Login: {
          value: "sssss",
          label: true,
          labelText: "Login",
          element: "input",
          config: {
            type: "email",
            name: "login",
            placeholder: "E-mail Address",
          },
          validation: {
            required: true,
            minLen: 5,
          },
          valid: false,
          validationMessage: "",
          touched: false,
        },
        Password: {
          value: "",
          label: true,
          labelText: "Password",
          element: "input",
          config: {
            type: "password",
            name: "password",
            placeholder: "Password",
          },
          validation: {
            required: true,
            minLen: 5,
          },
          valid: false,
          validationMessage: "",
          touched: false,
        },
      },
      active: false,
    };
  }

  handleActive = () => {
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (
      this.state.loginData.Password.value.length >= 8 &&
      regEmail.test(document.getElementById("Login").value)
    )
      this.setState({
        active: true,
      });
    else
      this.setState({
        active: false,
      });
  };

  handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var loginDataNested = { ...this.state.loginData };
    if (name === this.state.loginData.Login.config.name) {
      loginDataNested.Login.value = value;
      this.setState({ loginDataNested });
    }
    if (name === this.state.loginData.Password.config.name) {
      loginDataNested.Password.value = value;
      this.setState({ loginDataNested });
    }
    this.handleActive();
  };
  handleLoginValid = () => {
    var loginValid = { ...this.state.loginData };
    loginValid.Login.valid = true;
    this.setState({ loginValid });
  };

  handlePasswordValid = () => {
    var passwordValid = { ...this.state.loginData.Password.valid };
    passwordValid = true;
    this.setState({ passwordValid });
  };

  handleSubmit = (data) => {
    this.props.login(data);
  };

  componentWillMount() {
    var loginDataNested = { ...this.state.loginData };
    const email = localStorage.getItem("email");
    if (email !== "") {
      loginDataNested.Login.value = email;
      this.setState({ loginDataNested });
    }
  }
  render() {
    return (
      <FormLogin
        {...this.props}
        signIn={this.signIn}
        loginData={this.state.loginData}
        onChange={this.handleInput}
        handleLoginValid={this.handleLoginValid}
        handlePasswordValid={this.handlePasswordValid}
        handleSubmit={this.handleSubmit}
        active={this.state.active}
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
      login,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
