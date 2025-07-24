import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const LoginNGO = () => {
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

      if (user.role !== 'ngo') {
        setError('Access denied: Not an NGO user');
        return;
      }

      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/ngo/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <div
        style={{
          width: '400px',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>NGO Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="NGO Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.2rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              borderRadius: '8px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
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

export default LoginNGO;
