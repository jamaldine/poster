
import React, { Fragment } from "react";
import Posts from "../../Containers/Posts";
import PostHeader from "../../Components/Posts/PostHeader";

const HomePage = (props) => {


  const logOut = () => {
    props.history.push("/logout");
  };

  return (
    <Fragment>
    <PostHeader  {...props} logOut={logOut} />
    <Posts {...props} />
    </Fragment>
  );

};
export default HomePage;
