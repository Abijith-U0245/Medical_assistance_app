import React from 'react';
import './Popup.css';

const roles = ['Admin', 'Doctor', 'Hospital', 'Pharmacy', 'NGO', 'Patient'];

const RolePopup = ({ onSelect, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Select Your Role</h3>
        <div className="role-buttons">
          {roles.map(role => (
            <button key={role} onClick={() => onSelect(role)}>{role}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePopup;
