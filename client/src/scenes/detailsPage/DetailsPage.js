
import React from "react";
import PostHeader from "../../Components/Posts/PostHeader";
import Details from "../../Containers/Details";
import './style.scss';
const DetailsPage = (props) => {

  const logOut = () => {
    props.history.push("/logout");
  };
  return (
    <div className='forHeader'>
    <PostHeader  {...props} logOut={logOut} />
    <Details {...props} />
    </div>
  );
};
export default DetailsPage;
