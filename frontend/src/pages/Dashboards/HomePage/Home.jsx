import React, { useState } from 'react';
import './Home.css';
import RolePopup from './RolePopup';
import RoleLoginPopup from './RoleLoginPopup';

import ngoImg from "../../../assets/ngo.jpg";
import oldPeopleImg from "../../../assets/old_people.jpg.webp";
import avoidWasteImg from "../../../assets/avoid_medicine_waste.jpg";

const cardItems = [
  {
    label: 'NGOs for Medicine Reach',
    img: ngoImg,
    summary: 'Partnering with NGOs to deliver unused medicines quickly and safely.',
  },
  {
    label: 'Support for the Elderly',
    img: oldPeopleImg,
    summary: 'Helping senior citizens access affordable and timely medications.',
  },
  {
    label: 'Avoid Medicine Waste',
    img: avoidWasteImg,
    summary: 'Preventing environmental damage by redistributing unused medicine.',
  },
  
];

const Home = () => {
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowRolePopup(false);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Empowering Lives through AI-Driven Medicine Redistribution</h1>
        <p className="subheading">
          Connect unused medicines with NGOs, help the elderly, and prevent waste.
          Our platform ensures every tablet counts, reaching those who need it most — fast, smart, and free.
        </p>
        <button className="login-btn" onClick={() => setShowRolePopup(true)}>
          Login / Register
        </button>
      </header>

      <main className="card-grid">
        {cardItems.map((item, index) => (
          <div key={index} className="card">
            <img src={item.img} alt={item.label} />
            <p className="card-title">{item.label}</p>
            <p className="summary">{item.summary}</p>
          </div>
        ))}
      </main>

      <div className="chatbot-icon" title="Chat with us">💬</div>

      {showRolePopup && (
        <RolePopup onSelect={handleRoleClick} onClose={() => setShowRolePopup(false)} />
      )}

      {selectedRole && (
        <RoleLoginPopup role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </div>
  );
};

export default Home;
