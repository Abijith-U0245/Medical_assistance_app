// src/pages/Dashboards/NGODashboard/AvailableMedicines.jsx

import React from 'react';
import './AvailableMedicines.css';

const AvailableMedicines = () => {
  const sources = [
    { name: "Apollo Pharmacy", medicines: ["Paracetamol", "Ibuprofen", "Dolo"] },
    { name: "MedPlus Hospital", medicines: ["Vitamin C", "ORS Packets", "Amoxicillin"] },
    { name: "Relief Pharmacy", medicines: ["Cough Syrup", "Antibiotic Cream"] },
  ];

  return (
    <div className="available-section">
      <h2>Available Medicines Nearby</h2>
      <div className="available-grid">
        {sources.map((source, index) => (
          <div key={index} className="available-box">
            <h3>{source.name}</h3>
            <ul>
              {source.medicines.map((med, idx) => (
                <li key={idx}>{med}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableMedicines;
