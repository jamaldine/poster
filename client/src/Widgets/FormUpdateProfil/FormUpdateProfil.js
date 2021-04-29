import React from "react";

import { PATH_IMAGES } from "../../utils/config";

import "./FormUpdateProfil.scss";

const FormUpdateProfil = (props) => {
  const {
    updateProfilData,
    submitUpdateProfil,
    handleChange,
    inputField,
    handleChangeHere,
  } = props;

  const templateUpdateProfil = () => {
    let data = [];
    for (let item in updateProfilData) {
      data.push({ id: item, detail: updateProfilData[item] });
    }
    return data.map((item) => {
      return (
        <div key={item.id} className="title-content">
          {item.detail.config.type === "text" ? (
            <input
              className={item.id}
              {...item.detail.config}
              onChange={handleChange}
              value={item.detail.value}
            />
          ) : null}
        </div>
      );
    });
  };

  const templateMedias = () => {
    let data = [];
    for (let item in updateProfilData) {
      data.push({ id: item, detail: updateProfilData[item] });
    }
    return data.map((item) => {
      return (
        <div key={item.id}>
          {item.detail.config.type === "file" ? (<div key={item.id} className="title-content">
            <div className="details-medias">
              {item.detail.touched === true ? (
                <img
                  src={item.detail.value}
                  width="108"
                  height="87"
                  className="input-image"
                />
              ) : (
                <img
                  src={PATH_IMAGES + "account/" + item.detail.value}
                  className="input-image"
                />
              )}
              <input
                {...item.detail.config}
                onChange={handleChangeHere}
                ref={inputField}
                className="input-media"
              />
            </div>
          </div>  ) : null}
      </div>
      );
    });
  };

  return (
    <form onSubmit={submitUpdateProfil} className="formUpdateProfil">
      <div className="medias">{templateMedias()}</div>
      <div className="about">
        <div className="about-me">{templateUpdateProfil()}</div>
        <button className="updateProfil-btn">Save</button>{" "}
      </div>
    </form>
  );
};

export default FormUpdateProfil;
