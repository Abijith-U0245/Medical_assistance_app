import React, { useState } from 'react';
import './DoctorDashboard.css';
import doctorImage from './doctor.jpg';

const DoctorDashboard = () => {
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const confirmedAppointments = [
    { name: 'Prannav', reason: 'Blood Sugar Monitoring', age: 34, time: '10:30 AM' },
    { name: 'Shivani', reason: 'Regular BP Check-up', age: 67, time: '11:40 AM' },
    { name: 'Abijith', reason: 'Throat Pain', age: 29, time: '1:30 PM' }
];

  const pendingInvitations = [
    'Priyanka - General Checkup',
    'Vaimitra - Fever & Cold',
    'Syed - Throat Infection'
  ];

  const handleDoctorClick = () => setShowDoctorPopup(true);
  const handleDoctorClose = () => setShowDoctorPopup(false);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowPatientPopup(true);
  };

  const handlePatientClose = () => {
    setShowPatientPopup(false);
    setSelectedPatient(null);
  };

  return (
    <div className="dashboard">
      <h1>Doctor Dashboard</h1>

      <div className="doctor-card" onClick={handleDoctorClick}>
        <img src={doctorImage} alt="Doctor" className="doctor-image" />
        <h2>Dr. M. MAHATHI</h2>
        <p><strong>Patients Treated:</strong> 132</p>
      </div>

      {/* Doctor Popup */}
      {showDoctorPopup && (
        <div className="popup-overlay" onClick={handleDoctorClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <img src={doctorImage} alt="Doctor" className="popup-doctor-image" />
            <h2>Dr. M. Mahathi</h2>
            <p><strong>Specialization:</strong> General Physician</p>
            <p><strong>Patients Treated:</strong> 132</p>
            <button className="close-btn" onClick={handleDoctorClose}>Close</button>
          </div>
        </div>
      )}

      {/* Patient Popup */}
      {showPatientPopup && selectedPatient && (
        <div className="popup-overlay" onClick={handlePatientClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPatient.name}'s Appointment</h2>
            <p><strong>Reason:</strong> {selectedPatient.reason}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Time:</strong> {selectedPatient.time}</p>
            <button className="close-btn" onClick={handlePatientClose}>Close</button>
          </div>
        </div>
      )}

      <h2>Confirmed Appointments</h2>
      <ul>
        {confirmedAppointments.map((appointment, index) => (
          <li key={index}>
            <button className="appointment-btn" onClick={() => handlePatientClick(appointment)}>
              {appointment.name} - {appointment.reason}
            </button>
          </li>
        ))}
      </ul>

      <h2>Pending Invitations</h2>
      <div className="pending">
        {pendingInvitations.map((invite, idx) => (
          <div key={idx} className="invite">
            <span>{invite}</span>
            <div className="buttons">
              <button className="accept">Accept</button>
              <button className="reject">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
