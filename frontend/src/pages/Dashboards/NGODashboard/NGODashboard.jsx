// NGODashboard.jsx
import React, { useState } from 'react';
import './NGODashboard.css';
import PreviousPurchases from './PreviousPurchases';
import AvailableMedicines from './AvailableMedicines';
import GFormPopup from './GFormPopup';
import { FaPencilAlt } from 'react-icons/fa';

const NGODashboard = ({ ngo }) => {
  const [showForm, setShowForm] = useState(false);

  if (!ngo) return <div className="ngo-dashboard">No NGO data available.</div>;

  const { organizationname, registrationno, website, cause, donations, location } = ngo;

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
        <button className="primary-btn" onClick={() => setShowForm(true)}>Compose Medicine Request</button>
      </div>

      {showForm && <GFormPopup onClose={() => setShowForm(false)} ngo={ngo} />}
    </div>
  );
};

export default NGODashboard;
