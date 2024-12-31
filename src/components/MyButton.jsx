import React from "react";

const MyButton = ({ label, onClick, type = "button" }) => (
  <button type={type} className="btn" onClick={onClick}>
    {label}
  </button>
);

export default MyButton;
