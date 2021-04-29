import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Authentifications from "./Authentifications.scss";
import Loading from "../../Components/shared/Loading";
const Authentification = ({
  children,
  formSubmit,
  active,
  signUp,
  accountTxt,
  account,
  action,
  login,
  slogo,
  loader,
}) => {
  return (
    <div className="hoc">
      <form className="login_container" onSubmit={formSubmit}>
        <FontAwesomeIcon icon={faPaperclip} className="paper" />
        <div className="all-form">
          <div className="firstBoule"></div>
          <div className="all-log">
            <div className="logo">
              <div className="login-login">{login}</div>
              <div className="txt-logo">{slogo}</div>
            </div>
            <div className="log">
              {children}
              <div className="btn-wrapp">
                {loader ? (
                  <Loading />
                ) : (
                  <button className="sign" type="submit" disabled={!active}>
                    {action}
                  </button>
                )}
              </div>
            </div>
            <div className="account">
              <div className="account-txt">{accountTxt}</div>
              <div className="account-create" onClick={signUp}>
                {account}
              </div>
            </div>
          </div>

          <div className="lastBoule"></div>
        </div>
      </form>
    </div>
  );
};

export default Authentification;
