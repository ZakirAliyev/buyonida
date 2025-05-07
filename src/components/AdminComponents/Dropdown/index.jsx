import { useTranslation } from "react-i18next";
// Dropdown.jsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
const Dropdown = ({
  label,
  options,
  selectedOption,
  onSelect,
  onCreate,
  error,
  path
}) => {
  const {
    t
  } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return <div className="inputWrapper">
            <label>{label}</label>
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption || "Select a category"}
                </div>
                <div className={`dropdown-list ${isOpen ? "open" : "close"}`} style={{
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
                    {options.map(option => <div key={option.id} className="dropdown-item" onClick={() => {
          onSelect(option.name, option.id);
          setIsOpen(false);
        }}>
                            {option.name}
                        </div>)}
                    {!path && <>
                            <div className="line" />
                            <div className="dropdown-item" onClick={onCreate}>
                                <FiPlus className="icon" />
                                <span>{t("create_category")}</span>
                            </div>
                        </>}
                </div>
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>;
};
export default Dropdown;