import React, { useState } from 'react';
import './GFormPopup.css';
import axios from "axios";

const GFormPopup = ({ onClose, ngo }) => {
  const [formData, setFormData] = useState({
    name: ngo.organizationname || '',
    ngoId: ngo.registrationno || '',
    medicine: '',
    quantity: '',
    location: ngo.location?.area || '',
  });

  const medicineOptions = [
    'Paracetamol', 'Ibuprofen', 'Dolo 650', 'ORS Packets', 'Cough Syrup', 'Amoxicillin'
  ];

  const locationOptions = [
    'T. Nagar, Chennai', 'Anna Nagar, Chennai', 'Tambaram, Chennai', 'Velachery, Chennai'
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token"); // or however you store JWT

    const response = await axios.post(
      "http://localhost:5000/api/ngos/request-medicine",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Request successful:", response.data);
    alert("Request submitted successfully!");
  } catch (error) {
    console.error("❌ Submission failed:", error.response?.data || error.message);
    alert("Submission failed. Please try again.");
  }
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
          <input name="name" value={formData.name} onChange={handleChange} readOnly />

          <label>NGO ID</label>
          <input name="ngoId" value={formData.ngoId} onChange={handleChange} readOnly />

          <label>Medicine Name</label>
          <select name="medicine" value={formData.medicine} onChange={handleChange} required>
            <option value="">Select Medicine</option>
            {medicineOptions.map((med) => (
              <option key={med} value={med}>{med}</option>
            ))}
          </select>

          <label>Quantity</label>
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />

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
