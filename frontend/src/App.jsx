import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Login + Role selection
import RoleSelect from "./frontend/src/pages/login/RoleSelect";
import LoginAdmin from "./frontend/src/pages/login/LoginAdmin";

// Patient side
import PatientDashboard from "./frontend/src/pages/dashboard/PatientDashboard";
import BookAppointment from "./frontend/src/pages/BookAppointment";
import EventsPage from "./frontend/src/pages/EventsPage";
import NearbyDoctors from "./frontend/src/pages/NearbyDoctors";

// Doctor side
import DoctorDashboard from "./frontend/src/pages/dashboard/DoctorDashboard";

// Hospital side
import HospitalDashboard from "./frontend/src/pages/dashboard/HospitalDashboard";

// Pharmacy side
import PharmacyDashboard from "./frontend/src/pages/dashboard/PharmacyDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing + Login */}
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        {/* Add: /login/doctor, /login/patient, etc. */}

        {/* Patient routes */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/nearby-doctors" element={<NearbyDoctors />} />

        {/* Doctor route */}
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />

        {/* Hospital route */}
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />

        {/* Pharmacy route */}
        <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

