import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";

import Avatar from "../../Components/shared/Avatar";
import FormUpdateProfil from "../../Widgets/FormUpdateProfil/FormUpdateProfil";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProfil } from "../../actions/user";

import "./index.scss";

class Profil extends Component {
  inputField = React.createRef();
  state = {
    updateProfilData: {
      name: {
        value: this.props.user.login.name,
        label: false,
        labelText: "name",
        element: "input",
        config: {
          type: "text",
          name: "name",
          placeholder: "Name",
        },
        validation: {
          required: false,
        },
        valid: true,
        validationMessage: "",
        touched: false,
      },
      lastname: {
        value: this.props.user.login.lastname,
        label: false,
        labelText: "lastname",
        element: "input",
        config: {
          type: "text",
          name: "lastname",
          placeholder: "lastname",
        },
        validation: {
          required: false,
        },
        valid: true,
        validationMessage: "",
        touched: false,
      },
      avatar: {
        value: this.props.user.login.avatar,
        label: false,
        labelText: "avatar",
        element: "input",
        config: {
          type: "file",
          name: "avatar",
          placeholder: "avatar",
        },
        validation: {
          required: false,
        },
        valid: true,
        validationMessage: "",
        touched: false,
      },
    },
    update: false,
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.profil?.success)
    {
      this.props.users();
      this.props.history.push('/');
    }

  }
  submitUpdateProfil = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.set("id", this.props.user.login.id);
    dataToSend.set("name", this.state.updateProfilData.name.value);
    dataToSend.set("lastname", this.state.updateProfilData.lastname.value);
    if (this.inputField.current.files[0] !== undefined)
      dataToSend.append("file", this.inputField.current.files[0]);
    this.props.updateProfil(dataToSend); /**/
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var updateProfilDataNested = { ...this.state.updateProfilData };
    if (name === this.state.updateProfilData.name.config.name) {
      updateProfilDataNested.name.value = value;
      this.setState({ updateProfilDataNested });
    }
    if (name === this.state.updateProfilData.lastname.config.name) {
      updateProfilDataNested.lastname.value = value;
      this.setState({ updateProfilDataNested });
    }
  };

  updateAccount = () => {
    this.setState({
      update: !this.state.update,
    });
  };

  handleChangeHere = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var updateProfilDataNested = { ...this.state.updateProfilData };

    if (name === this.state.updateProfilData.avatar.config.name) {
      updateProfilDataNested.avatar.value = URL.createObjectURL(
        event.target.files[0]
      );
      updateProfilDataNested.avatar.touched = true;
      this.setState({ updateProfilDataNested });
    }
  };

  logOut = () => {
    this.props.history.push("/logout");
  };

  render() {
    return (
      <div className="profils">
        <div className="profil">
          {this.state.update === false && (
            <div className="show-profil">
              <div className="up-avatar">
                <div className="avatar-name">
                  <Avatar {...this.props} />
                  <div className="to-update">
                    <div className="about">
                      <p className="firstname">
                        First name: {this.props.user.login.name}
                      </p>
                      <p className="lastname">
                        Last name: {this.props.user.login.lastname}
                      </p>
                    </div>
                    <button
                      className="update-profil"
                      onClick={this.updateAccount}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="account">
                <hr />
                <div className="lastConnexion">
                  <div className="label">Registration date</div>
                  <Moment className="time" parse="YYYY-MM-DD HH:mm">
                    {this.props.user.login.registration}
                  </Moment>
                </div>
                <div className="lastConnexion">
                  <div className="label">Last connexion</div>
                  <Moment className="time" format="YYYY/MM/DD">
                    {this.props.dateStart}
                  </Moment>
                </div>
              </div>
            </div>
          )}
          {this.state.update === true && (
            <div className="update-profil">
              <FormUpdateProfil
                {...this.props}
                onImageDrop={this.onImageDrop}
                handleChange={this.handleChange}
                submitUpdateProfil={this.submitUpdateProfil}
                updateProfilData={this.state.updateProfilData}
                inputField={this.inputField}
                handleChangeHere={this.handleChangeHere}
              />
            </div>
          )}
        </div>
      </div>
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
      updateProfil,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
