import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "./components/EditModal";
import "../styles/patientdashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "canny",
    phone: "9876543210",
    aadhar: "1234-5678-9012",
    mobile: "9876543210",
    location: "Chennai"
  });

  const openEdit = () => setIsEditing(true);
  const closeEdit = () => setIsEditing(false);
  const updateProfile = (updated) => {
    setProfile(updated);
    closeEdit();
  };

  return (
    <div className="patient-dashboard">
      <header className="header">Patient</header>

      <section className="profile-section">
        <div className="profile-header">
          <h2>Profile</h2>
          <span className="edit-icon" onClick={openEdit}>✏️</span>
        </div>
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Mobile:</strong> {profile.mobile}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Aadhar ID:</strong> {profile.aadhar}</p>
        </div>
      </section>

      <section className="records-section">
        <h3>Past Records</h3>
        <div className="records-grid">
          <div className="record-box">Appointment with Apollo Hospital</div>
          <div className="record-box">Donated 3 tablets</div>
          <div className="record-box">Bought medicine: Crocin, Dolo</div>
          <div className="record-box">Consulted ENT Specialist</div>
          <div className="record-box">Participated in Blood Donation Camp</div>
          <div className="record-box">Vaccination for Flu</div>
          <div className="record-box">Free Health Checkup</div>
        </div>
      </section>

      <div className="bottom-actions">
        <button className="large-action-btn" onClick={() => navigate("/appointment")}>
          Book Appointment
        </button>
        <button className="large-action-btn" onClick={() => navigate("/events")}>
          Explore Events
        </button>
        <button className="large-action-btn" onClick={() => navigate("/nearby-doctors")}>
          Nearby Doctors
        </button>
      </div>

      {isEditing && (
        <EditModal
          profile={profile}
          onClose={closeEdit}
          onSave={updateProfile}
        />
      )}
    </div>
  );
}

export default PatientDashboard;
