// src/components/LoginPatient.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const LoginPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      const user = res.data;

      if (user.role !== 'patient') {
        setError('Access denied: Not a patient');
        return;
      }

      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/patient/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    }}>
      <div
        style={{
          width: '500px',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '2rem', color: '#333', fontSize: '1.8rem' }}>
          Patient Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Patient Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
          >
            Login
          </button>
          {error && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  marginBottom: '1.5rem',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '1rem 2.5rem',
  fontSize: '1rem',
  borderRadius: '10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default LoginPatient;
