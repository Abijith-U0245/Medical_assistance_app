import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
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
import NGODashboard from "./pages/Dashboards/NGODashboard/NGODashboard.jsx";

// ✅ Optional: use API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  // ✅ Example: test backend connectivity once on load
  useEffect(() => {
    axios.get(`${API_BASE_URL}/medicines`)
      .then(res => console.log("✅ Connected to backend:", res.data))
      .catch(err => console.error("❌ Backend error:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dashboards */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
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
