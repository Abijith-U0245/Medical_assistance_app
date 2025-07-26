import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data.data);
    } catch {
      setError('Unable to fetch users');
    }
  };

  const toggleAccess = async (id) => {
    await axios.patch(`/api/admin/users/${id}/toggle-access`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchUsers(); // Refresh
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.map((user) => (
        <div key={user._id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Disabled'}</p>
          <button onClick={() => toggleAccess(user._id)} style={{
            padding: '0.5rem 1rem',
            backgroundColor: user.isActive ? 'tomato' : 'green',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            {user.isActive ? 'Disable' : 'Enable'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;
