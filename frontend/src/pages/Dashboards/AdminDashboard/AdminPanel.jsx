import React from 'react';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">

        <div className="card">
          <h2>Overview</h2>
          <p>Track all activity including donations, collections, approvals, and AI flags.</p>
          <button onClick={() => handleNavigate('/admin/overview')}>Go to Overview</button>
        </div>

        <div className="card">
          <h2>Manage Users</h2>
          <p>View and control access for Hospitals, Pharmacies, NGOs, and Doctors.</p>
          <button onClick={() => handleNavigate('/admin/users')}>Manage Accounts</button>
        </div>

        <div className="card">
          <h2>AI Flagged Donations</h2>
          <p>See donations flagged by AI for verification and double-checking.</p>
          <button onClick={() => handleNavigate('/admin/flagged')}>Review Flagged</button>
        </div>

        <div className="card">
          <h2>Approval Queue</h2>
          <p>Approve or reject NGO final distributions post-AI verification.</p>
          <button onClick={() => handleNavigate('/admin/approvals')}>Go to Approvals</button>
        </div>

        <div className="card">
          <h2>Analytics</h2>
          <p>Monthly insights on donation flows, rejections, and verified deliveries.</p>
          <button onClick={() => handleNavigate('/admin/analytics')}>View Reports</button>
        </div>

        <div className="card">
          <h2>Feedback & Issues</h2>
          <p>View reported problems or feedback from platform users.</p>
          <button onClick={() => handleNavigate('/admin/feedbacks')}>Check Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
