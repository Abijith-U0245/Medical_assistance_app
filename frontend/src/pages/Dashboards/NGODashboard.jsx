import React from 'react';
import { FaRobot } from 'react-icons/fa';
import './NGODashboard.css'; // Optional: for styling

const NGODashboard = () => {
  return (
    <div className="ngo-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, NGO Partner 👋</h1>
        <p>Here’s your dashboard overview</p>
      </header>

      <section className="dashboard-stats">
        <div className="card">
          <h2>Medicines Donated</h2>
          <p>1200+</p>
        </div>
        <div className="card">
          <h2>Hospitals Collaborated</h2>
          <p>45</p>
        </div>
        <div className="card">
          <h2>NGO Volunteers</h2>
          <p>80</p>
        </div>
      </section>

      <section className="dashboard-tasks">
        <h2>Upcoming Activities</h2>
        <ul>
          <li>✔ Medicine donation camp – July 20</li>
          <li>✔ Volunteer training – July 25</li>
          <li>✔ Review collaboration report</li>
        </ul>
      </section>

      <button className="chatbot-button" title="Chat with us">
        <FaRobot size={28} />
      </button>
    </div>
  );
};

export default NGODashboard;
