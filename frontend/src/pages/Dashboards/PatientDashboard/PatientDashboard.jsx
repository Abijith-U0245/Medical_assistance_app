import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "./components/EditModal";
import "./styles/patientdashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Canny",
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">👤 Patient Dashboard</h1>

      <div className="dashboard-content">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-header">
            <h2>Profile</h2>
            <button className="edit-btn" onClick={openEdit}>Edit ✏️</button>
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Aadhar:</strong> {profile.aadhar}</p>
          </div>
        </div>

        {/* Records Section */}
        <div className="records-card">
          <h2>📄 Health Records</h2>
          <ul className="records-list">
            <li>Appointment with Apollo Hospital</li>
            <li>Donated 3 tablets</li>
            <li>Medicine purchased: Crocin, Dolo</li>
            <li>Consulted ENT Specialist</li>
            <li>Participated in Blood Donation Camp</li>
            <li>Flu Vaccination</li>
            <li>Free Health Checkup</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={() => navigate("/appointment")}>📅 Book Appointment</button>
        <button onClick={() => navigate("/events")}>🎉 Explore Events</button>
        <button onClick={() => navigate("/nearby-doctors")}>🩺 Nearby Doctors</button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditModal profile={profile} onClose={closeEdit} onSave={updateProfile} />
      )}
    </div>
  );
}

export default PatientDashboard;
