// HospitalDashboard.jsx
import React from 'react';
import './HospitalDashboard.css';

function HospitalDashboard() {
  return (
    <div className="hospital-dashboard">
      <header>
        <h1>Hospital Dashboard</h1>
        <p>Efficiently manage your medicine stock and donation activities.</p>
      </header>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <h3>Inventory Overview</h3>
          <p>Total Medicines: 320</p>
          <p>Expiring Soon: 15</p>
          <button>View Inventory</button>
        </div>

        <div className="dashboard-card">
          <h3>Donate Medicines</h3>
          <p>Surplus or nearing expiry?</p>
          <button>Donate Now</button>
        </div>

        <div className="dashboard-card">
          <h3>Donation Records</h3>
          <p>Track your previous donations to NGOs.</p>
          <button>View History</button>
        </div>

        <div className="dashboard-card">
          <h3>NGO Pickup Schedule</h3>
          <p>Next: HopeCare NGO - 4:00 PM Today</p>
          <button>View Schedule</button>
        </div>

        <div className="dashboard-card">
          <h3>Flagged Stock by AI</h3>
          <p>3 batches flagged for quality check.</p>
          <button>Review Batches</button>
        </div>

        <div className="dashboard-card">
          <h3>Feedback & Reports</h3>
          <p>Read NGO feedback and monthly reports.</p>
          <button>Read Reports</button>
        </div>
      </section>

      <div className="chatbot-icon">💬</div>
    </div>
  );
}

export default HospitalDashboard;