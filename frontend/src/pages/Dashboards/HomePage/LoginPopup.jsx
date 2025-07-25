// src/components/LoginPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';

function LoginPopup({ role, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const res = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          phone,
          password,
          role
        });
        alert('✅ Registered successfully');
        setIsSignup(false);
      } else {
        const res = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
          role
        });
        localStorage.setItem('token', res.data.token);
        window.location.href = `/dashboard/${res.data.user.role.toLowerCase()}`;
      }
    } catch (error) {
      alert(`❌ ${error.response?.data?.message || 'Error occurred'}`);
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'} as {role}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label>Name:</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />

              <label>Phone:</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
            </>
          )}

          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="signin-btn">
            {isSignup ? 'Register' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : 'Don’t have an account?'}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? ' Sign In' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPopup;
