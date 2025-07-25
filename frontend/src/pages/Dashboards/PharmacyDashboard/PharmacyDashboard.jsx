import React, { useState } from 'react';
import './PharmacyDashboard.css';
import axios from 'axios';

const PharmacyDashboard = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    expiryDate: '',
    cost: '',
    quantity: '',
    description: '',
  });
  const [image, setImage] = useState(null);

  const handleDonateClick = () => setShowDonationForm(true);
  const handleCancel = () => setShowDonationForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  formData.append("name", form.medicineName.value);
  formData.append("expiryDate", form.expiryDate.value);
  formData.append("minCost", form.minCost.value);
  formData.append("quantity", form.quantity.value);
  formData.append("description", form.description.value);
  formData.append("image", form.image.files[0]); // ✅ Add the uploaded image

  try {
    const res = await fetch("http://localhost:5000/api/medicines/donate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Medicine donated successfully");
      form.reset();
    } else {
      alert("❌ Submission failed: " + data.message);
    }
  } catch (error) {
    console.error("Upload Medicine Error:", error);
    alert("❌ Submission failed. Please try again.");
  }
};

  return (
    <div className="dashboard-container">
      <div className="profile-bar">
        <h2>Pharmacy Profile</h2>
        <p>Pharmacy Name: <strong>Arogya Meds</strong></p>
        <p>Location: <strong>Chennai, TN</strong></p>
        <p>Donations Made: <strong>12</strong></p>
        <p>Contact: <strong>+91-XXXXXXXXXX</strong></p>
      </div>

      <div className="main-dashboard">
        <h3>NGO Requests</h3>
        <table className="request-table">
          <thead>
            <tr>
              <th>NGO Name</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Helping Hands</td>
              <td>Paracetamol</td>
              <td>50</td>
              <td>2025-07-15</td>
              <td>Pending</td>
              <td>
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="donate-section">
          <button onClick={handleDonateClick}>➕ Donate Medicine</button>
        </div>

        {showDonationForm && (
          <div className="donation-form">
            <h4>Donate Medicine</h4>
            <form onSubmit={handleSubmit}>
  <label>Medicine Name:</label>
  <input type="text" name="medicineName" required />

  <label>Expiry Date:</label>
  <input type="date" name="expiryDate" required />

  <label>Minimum Cost:</label>
  <input type="number" name="minCost" required />

  <label>Quantity Available:</label>
  <input type="number" name="quantity" required />

  <label>Description (optional):</label>
  <textarea name="description" />

  <label>Upload Medicine Image:</label>
  <input type="file" name="image" accept="image/*" required />

  <button type="submit">Submit Donation</button>
  <button type="button" onClick={handleCancel}>Cancel</button>
</form>

          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDashboard;
