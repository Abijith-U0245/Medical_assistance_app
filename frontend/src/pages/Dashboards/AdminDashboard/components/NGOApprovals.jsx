import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NGOApprovals() {
  const [ngos, setNgos] = useState([]);

  const fetchNGOs = async () => {
    const res = await axios.get('/api/admin/approval-queue', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setNgos(res.data.data);
  };

  const approveNGO = async (id) => {
    await axios.post(`/api/admin/approve-ngo/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchNGOs();
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>NGO Approvals</h2>
      {ngos.map((ngo) => (
        <div key={ngo._id} style={{
          border: '1px solid #ccc',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px'
        }}>
          <p><strong>Name:</strong> {ngo.name}</p>
          <p><strong>Email:</strong> {ngo.email}</p>
          <button onClick={() => approveNGO(ngo._id)} style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>Approve</button>
        </div>
      ))}
    </div>
  );
}

export default NGOApprovals;
