import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await axios.get('/api/admin/feedbacks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFeedbacks(res.data.data);
    };
    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Feedback</h2>
      {feedbacks.map((f) => (
        <div key={f._id} style={{
          border: '1px solid #ddd',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '6px'
        }}>
          <p><strong>User:</strong> {f.userId?.email || 'Anonymous'}</p>
          <p><strong>Message:</strong> {f.message}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminFeedback;
