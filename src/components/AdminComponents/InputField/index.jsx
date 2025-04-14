// InputField.jsx
import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export const InputField = ({ label, id, name, value, onChange, error, placeholder, type = "text" }) => (
    <div className="inputWrapper">
        <label>{label}</label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={error ? "errorInput" : ""}
        />
        {error && (
            <span className="error-text">
        <AiOutlineExclamationCircle className="icon" />
                {error}
      </span>
        )}
    </div>
);
