// CheckboxField.jsx
import React from "react";

const CheckboxField = ({ label, checked, onChange }) => (
    <div className="checkboxWrapper">
        <input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
        <label>{label}</label>
    </div>
);

export default CheckboxField;
