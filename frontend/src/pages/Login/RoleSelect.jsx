import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-select-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '5rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>
        Select Your Role
      </h2>
      <div className="role-buttons" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <button onClick={() => handleSelect('admin')} style={btnStyle}>Admin</button>
        <button onClick={() => handleSelect('doctor')} style={btnStyle}>Doctor</button>
        <button onClick={() => handleSelect('hospital')} style={btnStyle}>Hospital</button>
        <button onClick={() => handleSelect('pharmacy')} style={btnStyle}>Pharmacy</button>
        <button onClick={() => handleSelect('ngo')} style={btnStyle}>NGO</button>
        <button onClick={() => handleSelect('patient')} style={btnStyle}>Patient</button>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default RoleSelect;
