// src/pages/Dashboards/NGODashboard/PreviousPurchases.jsx

import React from 'react';
import './PreviousPurchases.css';

const PreviousPurchases = () => {
  const purchases = [
    "Paracetamol - 100 strips",
    "Dolo 650 - 80 strips",
    "Cough Syrup - 30 bottles",
    "ORS Packets - 200 units",
    "Amoxicillin - 120 strips",
  ];

  return (
    <div className="purchases-section">
      <h2>Previous Medicine Purchases</h2>
      <div className="purchase-grid">
        {purchases.map((item, index) => (
          <div key={index} className="purchase-box">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPurchases;
