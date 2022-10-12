import React from "react";

const Button = ({ classButton, nameButton, handleEvent, id }) => (
    <button id={id} className={classButton} onClick={handleEvent}>{nameButton}</button>
)

export default Button