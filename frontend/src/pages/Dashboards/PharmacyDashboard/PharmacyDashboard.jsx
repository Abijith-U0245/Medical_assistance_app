import React, { useState } from 'react';
import './PharmacyDashboard.css'; // Optional: You can style separately

const PharmacyDashboard = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const handleDonateClick = () => {
    setShowDonationForm(true);
  };

  const handleCancel = () => {
    setShowDonationForm(false);
  };

  return (
    <div className="dashboard-container">
      {/* Top Profile Bar */}
      <div className="profile-bar">
        <h2>Pharmacy Profile</h2>
        <p>Pharmacy Name: <strong>Arogya Meds</strong></p>
        <p>Location: <strong>Chennai, TN</strong></p>
        <p>Donations Made: <strong>12</strong></p>
        <p>Contact: <strong>+91-XXXXXXXXXX</strong></p>
      </div>

      {/* Main Dashboard Section */}
      <div className="main-dashboard">
        <h3>NGO Requests</h3>

        {/* Request List Table */}
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
            {/* Sample row - loop through actual data */}
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

        {/* Donate Medicine Section */}
        <div className="donate-section">
          <button onClick={handleDonateClick}>➕ Donate Medicine</button>
        </div>

        {/* Donation Form */}
        {showDonationForm && (
          <div className="donation-form">
            <h4>Donate Medicine</h4>
            <form>
              <label>Medicine Name:</label>
              <input type="text" />

              <label>Expiry Date:</label>
              <input type="date" />

              <label>Minimum Cost:</label>
              <input type="number" />

              <label>Quantity Available:</label>
              <input type="number" />

              <label>Description (optional):</label>
              <textarea />

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