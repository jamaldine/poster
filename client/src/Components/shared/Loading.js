import React from "react";
import Loader from "react-loader-spinner";

import "./Loading.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = (props) => {
  return (
    <div className="loading">
      <Loader
        type="Oval"
        color="black"
        height={80}
        width={80}
        visible={true}
      />
    </div>
  );
};

export default Loading;
