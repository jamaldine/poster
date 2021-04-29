import React, { Component } from "react";
import FormRegister from "../../Widgets/formRegister/formRegister";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register, users } from "../../actions/user";

class Register extends Component {
  state = {
    registerData: {
      email: {
        value: "",
        label: true,
        labelText: "Email",
        element: "input",
        config: {
          type: "email",
          name: "email",
          placeholder: "Email",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        touched: false,
      },
      password: {
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
          minLen: 8,
        },
        valid: false,
        validationMessage: "",
        touched: false,
      },
      name: {
        value: "",
        label: true,
        labelText: "Name",
        element: "input",
        config: {
          type: "text",
          name: "name",
          placeholder: "Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        touched: false,
      },
      lastname: {
        value: "",
        label: true,
        labelText: "Lastname",
        element: "input",
        config: {
          type: "text",
          name: "lastname",
          placeholder: "Lastname",
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: "",
        touched: false,
      },
    },
    allUsers: [],
    validate: true,
    success: true,
    duplicatedUser: "",
    loader: false,
    active: false,
  };

  setLoader = () => {
    this.setState({
      loader: !this.state.loader,
    });
  };

  componentDidMount() {
    this.props.users();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.user.users,
    });
    this.setState({
      success: nextProps.user.register
        ? nextProps.user.register.success
        : this.state.success,
    });
  }

  signIn = () => {
    this.props.history.push("/login");
  };
  touchedInput = (target, name, value) => {
    var registerDataNested = { ...this.state.registerData };
    for (let element in registerDataNested) {
      if (name === "email") {
        this.validEmail(name, value);
      }
      if (name === "password") {
        this.validPassword(name, value);
      }
      if (name === "name") {
        this.validNameLastName(name, value, "Name required");
      }
      if (name === "lastname") {
        this.validNameLastName(name, value, "Lastname required");
      }
    }
  };

  validEmail = (name, value) => {
    var registerDataNested = { ...this.state.registerData };
    registerDataNested.email.value = value;
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (regEmail.test(document.getElementById("email").value)) {
      registerDataNested[name].validationMessage = "";
      registerDataNested[name].valid = true;
      this.setState({ registerDataNested });
    } else {
      if (registerDataNested[name].value === "") {
        registerDataNested[name].validationMessage = "Email required";
      } else {
        registerDataNested[name].validationMessage = "Email format incorrect";
      }
      registerDataNested[name].valid = false;
      this.setState({ registerDataNested });
      this.setState({
        validate: false,
      });
    }
  };
  validPassword = (name, value) => {
    var registerDataNested = { ...this.state.registerData };
    registerDataNested.password.value = value;
    if (registerDataNested[name].value === "") {
      registerDataNested[name].validationMessage = "Password required";
      this.setState({ registerDataNested });
    } else {
      registerDataNested[name].validationMessage = "";
      if (registerDataNested[name].value.length >= 8) {
        registerDataNested[name].valid = true;
      } else {
        registerDataNested[name].valid = false;
        registerDataNested[
          name
        ].validationMessage = `${registerDataNested[name].validation.minLen} caracteres at least for the password !`;
      }
      this.setState({ registerDataNested });
    }
  };
  validNameLastName = (name, value, message) => {
    var registerDataNested = { ...this.state.registerData };
    if (name === "name") registerDataNested.name.value = value;
    if (name === "lastname") registerDataNested.lastname.value = value;
    if (registerDataNested[name].value === "") {
      registerDataNested[name].validationMessage = message;
      this.setState({ registerDataNested });
    } else {
      registerDataNested[name].validationMessage = "";
      registerDataNested[name].valid = true;
      this.setState({ registerDataNested });
    }
  };

  handleInput = (event) => {
    this.setState({
      active: true,
    });

    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.touchedInput(target, name, value);
    for (let irem in this.state.registerData) {
      if (this.state.registerData[irem].valid === false) {
        this.setState({
          active: false,
        });
        break;
      }
    }
  };

  touched = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.touchedInput(target, name, value);
  };

  validation = () => {
    this.setState({
      validate: true,
      loader: true,
    });
    const data = {
      email: this.state.registerData.email.value,
      password: this.state.registerData.password.value,
      name: this.state.registerData.name.value,
      lastname: this.state.registerData.lastname.value,
    };
    setTimeout(() => {
      let exist = false;
      if (this.state.validate === true) {
        this.state.allUsers.filter((item) => {
          if (item.email === this.state.registerData.email.value)
            return (exist = true);
        });
        if (!exist) {
          this.props.register(data);
          this.setState({
            duplicatedUser: "Valid registration! SignIn bellow",
            loader: false,
          });
          localStorage.setItem("email", this.state.registerData.email.value);
          setTimeout(() => {
            //this.props.history.push("/login");
          }, 3000);
        } else {
          var registerDataNested = { ...this.state.registerData };
          registerDataNested.email.validationMessage = "Email already exist !";
          registerDataNested.email.valid = false;
          this.setState({ registerDataNested, loader: false, active: false });
        }
      } else {
        console.log("validate is still false, please correct !");
      }
    }, 2000);
  };

  render() {
    return (
      <FormRegister
        {...this.props}
        registerData={this.state.registerData}
        signIn={this.signIn}
        handleInput={this.handleInput}
        touched={this.touched}
        validation={this.validation}
        success={this.state.success}
        duplicatedUser={this.state.duplicatedUser}
        loader={this.state.loader}
        setLoader={this.setLoader}
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
      register,
      users,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
