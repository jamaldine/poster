import React from "react";

import "./Input.scss"

const Input = ( { name, type, placeholder, value } ) => {
  return(
  <div className='input'>
    <input name={name} type= {type} placeholder={placeholder} value={value} className="input-field" />
  </div>
  )
};

export default Input;
