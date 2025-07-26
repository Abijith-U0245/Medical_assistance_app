import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/overview', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOverview(res.data.data);
      } catch (err) {
        setError('Failed to load overview');
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) return <p style={{ color: '#555' }}>Loading overview...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Overview</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>Total Medicines: {overview.totalMedicines}</li>
        <li>Total Users: {overview.totalUsers}</li>
        <li>Total NGOs: {overview.totalNGOs}</li>
        <li>AI Flagged Donations: {overview.flaggedDonations.length}</li>
      </ul>
    </div>
  );
}

export default AdminOverview;
