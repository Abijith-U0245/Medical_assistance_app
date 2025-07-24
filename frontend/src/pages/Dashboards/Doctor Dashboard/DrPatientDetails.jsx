// DrPatientDetails.jsx
import React from 'react';
import './DrPatientDetails.css';

const DrPatientDetails = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Patient Details</h3>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Contact:</strong> {patient.contact || 'Not available'}</p>
        <p><strong>Address:</strong> {patient.address || 'Not available'}</p>
        <p><strong>Health Issue:</strong> {patient.healthIssue || 'Not mentioned'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DrPatientDetails;