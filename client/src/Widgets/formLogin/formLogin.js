import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./formLogin.scss";
import Authentification from "../../HOC/form/Authentification";
const FormLogin = (props) => {
  const { active } = props;
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    if (props.user.login) {
      props.user.login.message === "auth failled, email not found"
        ? setIsEmail(true)
        : setIsEmail(false);
      props.user.login.message === "Wrong password"
        ? setIsPassword(true)
        : setIsPassword(false);
    }

    if (isEmail) props.handleLoginValid();
    if (isPassword) props.handlePasswordValid();
  }, [props.user.login, isEmail, isPassword]);

  const template = () => {
    const { loginData } = props;
    let data = [];
    for (let element in loginData) {
      data.push({ id: element, setting: loginData[element] });
    }
    return data.map((item) => {
      return (
        <div className="template-login" key={item.id}>
          {renderTemplate(item)}
        </div>
      );
    });
  };
  const renderTemplate = (data) => {
    let template = null;
    let typeElement = data.setting;
    switch (typeElement.element) {
      case "input":
        template = (
          <div className="login-fileds">
            <FontAwesomeIcon
              icon={data.id === "Password" ? faKey : faEnvelope}
              className="envoloe-key"
            />
            <div className="input-with-errors">
              {data.id === "Password" ? (
                <input
                  id={data.id}
                  className={isPassword ? `not-input-field` : `input-field`}
                  {...typeElement.config}
                  onChange={props.onChange}
                />
              ) : (
                <input
                  id={data.id}
                  className={isEmail ? `not-input-field` : `input-field`}
                  {...typeElement.config}
                  onChange={props.onChange}
                  value={data.setting.value}
                />
              )}{" "}
            </div>
          </div>
        );
        break;
      default:
        template = null;
    }
    return template;
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: props.loginData.Login.value,
      password: props.loginData.Password.value,
    };
    props.handleSubmit(data);
  };
  const signUp = () => {
    props.history.push("/register");
  };
  const accountTxt = "don't have an account ?";
  const account = "Create account";
  const action = "Login";
  const login = "Login";
  const slogo = "Your day as you want";
  return (
    <Authentification
      login={login}
      slogo={slogo}
      formSubmit={formSubmit}
      active={active}
      signUp={signUp}
      accountTxt={accountTxt}
      account={account}
      action={action}
    >
      {template()}
    </Authentification>
  );
};

export default FormLogin;
