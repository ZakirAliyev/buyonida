import { useTranslation } from "react-i18next";
// CheckboxField.jsx
import React from "react";
const CheckboxField = ({
  label,
  checked,
  onChange
}) => {
  const {
    t
  } = useTranslation();
  return <div className="checkboxWrapper">
        <input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
        <label>{label}</label>
    </div>;
};
export default CheckboxField;