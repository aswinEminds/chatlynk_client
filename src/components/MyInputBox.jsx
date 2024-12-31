import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import "./style.css";

const MyInputBox = ({ type, placeholder, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="input-group">
      <input
        type={
          type === "password" ? (isPasswordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        className="input-box"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="toggle-visibility"
          aria-label={isPasswordVisible ? "Hide Password" : "Show Password"}
        >
          {isPasswordVisible ? <HiEyeOff /> : <HiEye />}
        </button>
      )}
    </div>
  );
};

export default MyInputBox;
