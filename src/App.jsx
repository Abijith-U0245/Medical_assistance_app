// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Home and Dashboard pages
import Home from "./pages/Dashboards/HomePage/Home.jsx";
import PatientDashboard from "./pages/Dashboards/PatientDashboard/PatientDashboard.jsx";
import BookAppointment from "./pages/Dashboards/PatientDashboard/BookAppointment.jsx";
import EventsPage from "./pages/Dashboards/PatientDashboard/EventsPage.jsx";
import NearbyDoctors from "./pages/Dashboards/PatientDashboard/doctor.jsx";
import DoctorDashboard from "./pages/Dashboards/DoctorDashboard/DoctorDashboard.jsx";
import HospitalDashboard from "./pages/Dashboards/HospitalDashboard/HospitalDashboard.jsx";
import PharmacyDashboard from "./pages/Dashboards/PharmacyDashboard/PharmacyDashboard.jsx";
import AdminPanel from "./pages/Dashboards/AdminDashboard/AdminPanel.jsx";
import NGODashboard from "./pages/Dashboards/NGODashboard/NGODashboard.jsx"; // ✅ Correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dashboards */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} /> {/* ✅ NGO Page */}
        <Route path="/dashboard/admin" element={<AdminPanel />} />

        {/* Patient-specific routes */}
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/nearby-doctors" element={<NearbyDoctors />} />
      </Routes>
    </Router>
  );
}

export default App;
