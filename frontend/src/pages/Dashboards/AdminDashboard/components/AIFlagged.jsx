import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AIFlagged() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlagged = async () => {
      try {
        const res = await axios.get('/api/admin/ai-flagged-donations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDonations(res.data.data);
      } catch {
        setError('Failed to load flagged donations');
      }
    };
    fetchFlagged();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>AI-Flagged Donations</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {donations.map((item) => (
        <div key={item._id} style={{
          border: '1px solid #eee',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px'
        }}>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Reason:</strong> AI flagged for review</p>
        </div>
      ))}
    </div>
  );
}

export default AIFlagged;
