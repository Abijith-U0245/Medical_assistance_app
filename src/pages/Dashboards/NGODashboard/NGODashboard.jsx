// src/pages/Dashboards/NGODashboard/NGODashboard.jsx
{/* Updated*/}

import React, { useState } from 'react';
import './NGODashboard.css';
import PreviousPurchases from './PreviousPurchases';
import AvailableMedicines from './AvailableMedicines';
import GFormPopup from './GFormPopup';
import { FaPencilAlt } from 'react-icons/fa';

const NGODashboard = ({ ngo }) => {
  const [showForm, setShowForm] = useState(false);

  // Default NGO data if not passed via props
  const fallbackNgo = {
    organizationname: "Doctor Buddy Foundation",
    registrationno: "NGO-2025-001",
    website: "https://www.apollo247.com",
    cause: "Healthcare Support",
    donations: "₹5,00,000",
    location: {
      area: "Velachery",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India"
    }
  };

  const finalNgo = ngo || fallbackNgo;
  const { organizationname, registrationno, website, cause, donations, location } = finalNgo;

  return (
    <div className="ngo-dashboard">
      <div className="ngo-profile">
        <div className="ngo-header">
          <h1>NGO Profile</h1>
          <FaPencilAlt className="edit-icon" />
        </div>

        <p><strong>Name:</strong> {organizationname}</p>
        <p><strong>Registration No:</strong> {registrationno}</p>
        <p><strong>Website:</strong> <a href={website} target="_blank" rel="noreferrer">{website}</a></p>
        <p><strong>Cause:</strong> {cause}</p>
        <p><strong>Donations:</strong> {donations}</p>
        <p><strong>Location:</strong> {location.area}, {location.city}, {location.state}, {location.country}</p>
      </div>

      <PreviousPurchases />
      <AvailableMedicines />

      <div className="ngo-buttons">
        <button className="primary-btn" onClick={() => setShowForm(true)}>
          Compose Medicine Request
        </button>
      </div>

      {showForm && <GFormPopup onClose={() => setShowForm(false)} ngo={finalNgo} />}
    </div>
  );
};

export default NGODashboard;
