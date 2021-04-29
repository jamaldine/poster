import React from "react";
import "./formRegister.scss";
import Authentification from "../../HOC/form/Authentification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const formRegister = ({
  registerData,
  signIn,
  handleInput,
  touched,
  validation,
  success,
  duplicatedUser,
  setLoader,
  loader,
  active,
}) => {
  const data = [];
  const renderRegister = () => {
    for (let element in registerData) {
      data.push({ field: element, fieldContent: registerData[element] });
    }
    return data.map((item) => (
      <div className="template-login" key={item.field}>
        {renderTemplate(item)}
      </div>
    ));
  };

  const renderTemplate = (item) => {
    console.log("item", item);
    return (
      <div className="login-fileds">
        {item.field === "password" ? (
          <FontAwesomeIcon icon={faKey} className="envoloe-key" />
        ) : item.field === "email" ? (
          <FontAwesomeIcon icon={faEnvelope} className="envoloe-key" />
        ) : item.field === "name" ? (
          <FontAwesomeIcon icon={faUser} className="envoloe-key" />
        ) : item.field === "lastname" ? (
          <FontAwesomeIcon icon={faUsers} className="envoloe-key" />
        ) : null}
        <div className="input-with-errors">
          <input
            id={item.field}
            value={item.fieldContent.value}
            {...item.fieldContent.config}
            className={
              !item.fieldContent.valid || item.fieldContent.validationMessage
                ? `not-input-field`
                : `input-field`
            }
            onChange={handleInput}
            onBlur={touched}
          />

          {item.fieldContent.validationMessage ? (
            <div className="input-err">
              {" "}
              {item.fieldContent.validationMessage}{" "}
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  const submitResistration = (e) => {
    e.preventDefault();
    validation();
  };

  const accountTxt = "have an account ?";
  const account = "Sing In";
  const action = "Sign Up";
  const login = "Sign In";
  const slogo = "Register and enjoy the day";

  return (
    <Authentification
      login={login}
      slogo={slogo}
      formSubmit={submitResistration}
      active={active}
      signUp={signIn}
      accountTxt={accountTxt}
      account={account}
      action={action}
      setLoader={setLoader}
      loader={loader}
    >
      {renderRegister()}
      <div
        className={
          duplicatedUser === "valid registration !"
            ? "duplicat"
            : "signUp-db-error"
        }
      >
        {success ? duplicatedUser : "error, please re-try"}
      </div>
    </Authentification>
  );
};

export default formRegister;
