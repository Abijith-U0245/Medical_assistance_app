import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorDashboard.css';
import doctorImage from './doctor.jpg';

const DoctorDashboard = () => {
  const [showDoctorPopup, setShowDoctorPopup] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [invitations, setInvitations] = useState([]); // Placeholder for now

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const doctorId = JSON.parse(atob(token.split('.')[1]))?.id;

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${API_URL}/doctors/${doctorId}`);
        console.log('👨‍⚕️ Doctor:', res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.error('❌ Error fetching doctor info:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_URL}/doctors/appointments/doctor/${doctorId}`);
        setAppointments(res.data.data);
      } catch (error) {
        console.error('❌ Error fetching appointments:', error);
      }
    };

    fetchDoctor();
    fetchAppointments();
  }, [doctorId]);

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

  const renderDoctorName = () => {
  return (
    doctor?.user?.name ||
    doctor?.name || // fallback if user not populated
    'Loading Doctor...'
  );
};

  return (
    <div className="dashboard">
      <h1>Doctor Dashboard</h1>

      <div className="doctor-card" onClick={handleDoctorClick}>
        <img src={doctorImage} alt="Doctor" className="doctor-image" />
        <h2>{renderDoctorName()}</h2>
        <p><strong>Patients Treated:</strong> {doctor?.patientsTreated || 0}</p>
      </div>

      {/* Doctor Popup */}
      {showDoctorPopup && (
        <div className="popup-overlay" onClick={handleDoctorClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <img src={doctorImage} alt="Doctor" className="popup-doctor-image" />
            <h2>{renderDoctorName()}</h2>
            <p><strong>Specialization:</strong> {doctor?.specialization || 'General Physician'}</p>
            <p><strong>Patients Treated:</strong> {doctor?.patientsTreated || 0}</p>
            <button className="close-btn" onClick={handleDoctorClose}>Close</button>
          </div>
        </div>
      )}

      {/* Patient Popup */}
      {showPatientPopup && selectedPatient && (
        <div className="popup-overlay" onClick={handlePatientClose}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPatient.patient?.name || selectedPatient.name}'s Appointment</h2>
            <p><strong>Reason:</strong> {selectedPatient.purpose || selectedPatient.reason}</p>
            <p><strong>Age:</strong> {selectedPatient.patient?.age || selectedPatient.age}</p>
            <p><strong>Time:</strong> {selectedPatient.time || '—'}</p>
            <button className="close-btn" onClick={handlePatientClose}>Close</button>
          </div>
        </div>
      )}

      <h2>Confirmed Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <button className="appointment-btn" onClick={() => handlePatientClick(appointment)}>
                {appointment.patient?.name || 'Patient'} - {appointment.purpose}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No confirmed appointments</p>
      )}

      <h2>Pending Invitations</h2>
      <p>(Hook this to real API later)</p>
      <div className="pending">
        {invitations.length > 0 ? (
          invitations.map((invite, idx) => (
            <div key={idx} className="invite">
              <span>{invite}</span>
              <div className="buttons">
                <button className="accept">Accept</button>
                <button className="reject">Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p>No invitations</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
