// AdminPanel.jsx
import React from 'react';
import './AdminPanel.css';

function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <div className="card">
          <h2>Overview</h2>
          <p>Track all activity including donations, collections, approvals, and AI flags.</p>
        </div>

        <div className="card">
          <h2>Manage Users</h2>
          <p>View and control access for Hospitals, Pharmacies, NGOs, and Doctors.</p>
          <button>Manage Accounts</button>
        </div>

        <div className="card">
          <h2>AI Flagged Donations</h2>
          <p>See donations flagged by AI for verification and double-checking.</p>
          <button>Review Flagged</button>
        </div>

        <div className="card">
          <h2>Approval Queue</h2>
          <p>Approve or reject NGO final distributions post-AI verification.</p>
          <button>Go to Approvals</button>
        </div>

        <div className="card">
          <h2>Analytics</h2>
          <p>Monthly insights on donation flows, rejections, and verified deliveries.</p>
          <button>View Reports</button>
        </div>

        <div className="card">
          <h2>Feedback & Issues</h2>
          <p>View reported problems or feedback from platform users.</p>
          <button>Check Feedback</button>
        </div>
      </div>

      <div className="chatbot-icon">
        <img src="/assets/chatbot-icon.png" alt="Chatbot" />
      </div>
    </div>
  );
}

export default AdminPanel;