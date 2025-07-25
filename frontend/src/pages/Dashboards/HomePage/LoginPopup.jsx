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
    const userRole = role.toLowerCase();

    try {
      if (isSignup) {
        await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          phone,
          password,
          role: userRole,
        });
        alert('✅ Registered successfully');
        setIsSignup(false);
      } else {
        // Fix this block in handleSubmit
        const res = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
          role: userRole
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);  // store for all users
        localStorage.setItem(`${res.data.user.role}Id`, res.data.user._id); // store doctorId or patientId

        window.location.href = `/dashboard/${res.data.user.role}`;


      }
    } catch (error) {
      alert(`❌ ${error.response?.data?.message || error.message || 'Unknown error'}`);
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
