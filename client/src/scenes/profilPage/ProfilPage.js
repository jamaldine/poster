import React from "react";
import { Fragment } from "react";
import PostHeader from "../../Components/Posts/PostHeader";
import Profil from "../../Containers/Profil";

const ProfilPage = (props) => {
  const logOut = () => {
    props.history.push("/logout");
  };

  return (
    <Fragment>
      <PostHeader {...props} logOut={logOut} />
      <Profil {...props} />
    </Fragment>
  );
};
export default ProfilPage;
