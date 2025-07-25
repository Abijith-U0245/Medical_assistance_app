import React, { useState } from 'react';
import './Home.css';

import RolePopup from './RolePopup';
import RoleLoginPopup from './LoginPopup';

import ngoImg from "../../../assets/ngo.jpg";
import oldPeopleImg from "../../../assets/old_people.jpg.webp";
import avoidWasteImg from "../../../assets/avoid_medicine_waste.jpg";
import ChatUI from './components/ChatUI';
import MedicineDonationForm from './components/MedicineDonationForm';

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
  const [showChat, setShowChat] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false); // ✅ donation form toggle

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowRolePopup(false);
  };

  const closeLoginPopup = () => {
    setSelectedRole(null);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Empowering Lives through AI-Driven Medicine Redistribution</h1>
        <p className="subheading">
          Connect unused medicines with NGOs, help the elderly, and prevent waste.
          Our platform ensures every tablet counts, reaching those who need it most — fast, smart, and free.
        </p>

        {/* ✅ Login and Donate buttons */}
        <div className="button-group">
  <button className="login-btn" onClick={() => setShowRolePopup(true)}>
    Login / Register
  </button>
  <button className="login-btn" onClick={() => setShowDonateForm(true)}>
    Donate Medicine
  </button>
</div>
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

      {/* ✅ Chatbot Toggle Icon */}
      <div
        className="chatbot-icon fixed bottom-5 right-5 text-3xl cursor-pointer"
        title="Chat with us"
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </div>

      {/* ✅ Chat Popup */}
      {showChat && (
        <div className="fixed bottom-20 right-5 z-50">
          <ChatUI />
        </div>
      )}

      {/* ✅ Role Selection Modal */}
      {showRolePopup && (
        <RolePopup
          onSelect={handleRoleClick}
          onClose={() => setShowRolePopup(false)}
        />
      )}

      {/* ✅ Login Modal */}
      {selectedRole && (
        <RoleLoginPopup
          role={selectedRole}
          onClose={closeLoginPopup}
        />
      )}

      {/* ✅ Public Medicine Donation Modal */}
      {showDonateForm && (
        <MedicineDonationForm
          onClose={() => setShowDonateForm(false)}
        />
      )}
    </div>
  );
};

export default Home;
