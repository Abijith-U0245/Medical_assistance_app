// src/pages/dashboard/RoleLoginPopup.jsx
import React, { useState } from 'react';
import './Popup.css';
import { useNavigate } from 'react-router-dom';

const RoleLoginPopup = ({ role, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log(`${isSignUp ? "Signing up" : "Logging in"} as ${role}`, formData);

    if (!isSignUp) {
      const dashboards = {
        admin: '/dashboard/admin',
        doctor: '/dashboard/doctor',
        hospital: '/dashboard/hospital',
        patient: '/dashboard/patient',
        pharmacy: '/dashboard/pharmacy',
        ngo: '/dashboard/ngo',
      };

      const lowerRole = role.toLowerCase();
      const path = dashboards[lowerRole];

      if (path) {
        navigate(path);
      } else {
        console.warn('Unknown role:', role);
      }
    }

    onClose(); // Close popup
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>{isSignUp ? `Sign Up as ${role}` : `Login as ${role}`}</h3>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="login-submit">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="switch-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button className="switch-btn" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleLoginPopup;
