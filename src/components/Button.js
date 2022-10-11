import React from "react";

const Button = ({ classButton, nameButton, handleEvent }) => (
    <button className={classButton} onClick={handleEvent}>{nameButton}</button>
)

export default Button