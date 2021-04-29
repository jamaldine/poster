import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./PostActions.scss";

const PostEvent = (props) => {

  const { logOut, actions, togglePopin } = props;

  const [open, setOpen] = React.useState(false);

  const profil = () => {
    togglePopin();
    props.history.push("/profil");
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      {actions ? (
        <div className='popIN'>
          <div className='postActions' onClick={togglePopin}></div>
          <div className="headerActions">
            <div className="closedActions" onClick={togglePopin}>
              <FontAwesomeIcon icon={faPlus} className="closed" />
            </div>
            <div className="nameNav">
              <FontAwesomeIcon icon={faUser} className="user" />
              <div className="name" onClick={profil}>
                {props.user.login.name} {props.user.login.lastname}
              </div>
            </div>
            <div className="logout">
              <FontAwesomeIcon icon={faPowerOff} className="powerOff" />
              <div className="logoutNav" onClick={logOut}>
                LOGOUT
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PostEvent;
