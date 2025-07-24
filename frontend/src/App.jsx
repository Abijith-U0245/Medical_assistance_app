import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from 'axios';

// Login + Role selection
import RoleSelect from "./pages/Login/RoleSelect";
import LoginAdmin from "./pages/Login/LoginAdmin.jsx";
import LoginDoctor from "./pages/Login/LoginDoctor.jsx";
import LoginHospital from "./pages/Login/LoginHospital.jsx";
import LoginPharmacy from "./pages/Login/LoginPharmacy.jsx";
import LoginNGO from "./pages/Login/LoginNGO.jsx";
import LoginPatient from "./pages/Login/LoginPatient.jsx";
// Patient Dashboard & Features
import PatientDashboard from "./pages/Dashboards/PatientDashboard/PatientDashboard.jsx";
import BookAppointment from "./pages/Dashboards/PatientDashboard/BookAppointment.jsx";
import EventsPage from "./pages/Dashboards/PatientDashboard/EventsPage.jsx";
import NearbyDoctors from "./pages/Dashboards/PatientDashboard/doctor.jsx";

// Doctor Dashboard
import DoctorDashboard from "./pages/Dashboards/DoctorDashboard/DoctorDashboard.jsx";

// Hospital Dashboard
import HospitalDashboard from "./pages/Dashboards/HospitalDashboard/HospitalDashboard.jsx";

// Pharmacy Dashboard
import PharmacyDashboard from "./pages/Dashboards/PharmacyDashboard/PharmacyDashboard.jsx";

// Admin Panel
import AdminPanel from "./pages/Dashboards/AdminDashboard/AdminPanel.jsx";

// NGO Dashboard
import NGODashboard from "./pages/Dashboards/NGODashboard/NGODashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing + Login */}
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/doctor" element={<LoginDoctor />} />
        <Route path="/login/hospital" element={<LoginHospital />} />
        <Route path="/login/pharmacy" element={<LoginPharmacy />} />
        <Route path="/login/ngo" element={<LoginNGO />} />
<Route path="/login/patient" element={<LoginPatient />} />
        {/* Dashboards */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
        <Route path="/dashboard/admin" element={<AdminPanel />} />

        {/* Patient-specific pages */}
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/nearby-doctors" element={<NearbyDoctors />} />
      </Routes>
    </Router>
  );
}

export default App;
