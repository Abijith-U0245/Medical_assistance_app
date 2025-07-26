import React, { useEffect, useState } from 'react';

function InventoryView() {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/medicines', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setMedicines(data.data);
        } else {
          setError(data.message || 'Error fetching inventory');
        }
      } catch (err) {
        setError('Network error');
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Medicine Inventory</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {medicines.length === 0 && !error && <p>No medicines available.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Batch No</th>
            <th style={thStyle}>Expiry Date</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id}>
              <td style={tdStyle}>{med.name}</td>
              <td style={tdStyle}>{med.batchNumber || '-'}</td>
              <td style={tdStyle}>{new Date(med.expiryDate).toLocaleDateString()}</td>
              <td style={tdStyle}>{med.quantity}</td>
              <td style={tdStyle}>
                {new Date(med.expiryDate) < new Date() ? 'Expired' : 'Valid'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '0.75rem',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #eee',
};

export default InventoryView;
