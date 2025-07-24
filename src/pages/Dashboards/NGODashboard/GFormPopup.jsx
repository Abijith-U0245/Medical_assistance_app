// src/pages/Dashboards/NGODashboard/GFormPopup.jsx

import React, { useState } from 'react';
import './GFormPopup.css';

const GFormPopup = ({ onClose, ngo }) => {
  const [formData, setFormData] = useState({
    name: ngo?.organizationname || '',
    ngoId: ngo?.registrationno || '',
    medicine: '',
    quantity: '',
    location: ngo?.location?.area + ', ' + ngo?.location?.city || '',
  });

  const medicineOptions = [
    'Paracetamol', 'Ibuprofen', 'Dolo 650', 'ORS Packets', 'Cough Syrup', 'Amoxicillin'
  ];

  const locationOptions = [
    'T. Nagar, Chennai', 'Anna Nagar, Chennai', 'Tambaram, Chennai', 'Velachery, Chennai'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Request Medicine</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>NGO ID</label>
          <input name="ngoId" value={formData.ngoId} onChange={handleChange} />

          <label>Medicine Name</label>
          <select name="medicine" value={formData.medicine} onChange={handleChange} required>
            <option value="">Select Medicine</option>
            {medicineOptions.map((med) => (
              <option key={med} value={med}>{med}</option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Nearby Location</label>
          <select name="location" value={formData.location} onChange={handleChange} required>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GFormPopup;
