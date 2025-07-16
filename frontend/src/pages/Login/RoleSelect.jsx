import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-select-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button onClick={() => handleSelect('admin')}>Admin</button>
        <button onClick={() => handleSelect('doctor')}>Doctor</button>
        <button onClick={() => handleSelect('hospital')}>Hospital</button>
        <button onClick={() => handleSelect('pharmacy')}>Pharmacy</button>
        <button onClick={() => handleSelect('ngo')}>NGO</button>
      </div>
    </div>
  );
};

export default RoleSelect;
