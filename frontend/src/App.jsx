import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Main Pages
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

// Admin Dashboard Pages
import AdminOverview from "./pages/Dashboards/AdminDashboard/components/AdminOverview.jsx";
import AdminUsers from "./pages/Dashboards/AdminDashboard/components/AdminUsers.jsx";
import AIFlagged from "./pages/Dashboards/AdminDashboard/components/AIFlagged.jsx";
import NGOApprovals from "./pages/Dashboards/AdminDashboard/components/NGOApprovals.jsx";
import AdminFeedback from "./pages/Dashboards/AdminDashboard/components/AdminFeedback.jsx";

// Hospital Dashboard pages
import InventoryView from './pages/Dashboards/HospitalDashboard/InventoryView';
import DonateMedicines from "./pages/Dashboards/HospitalDashboard/DonateMedicines.jsx";
import DonationRecords from "./pages/Dashboards/HospitalDashboard/DonationRecords.jsx";
import PickupSchedule from "./pages/Dashboards/HospitalDashboard/PickupSchedule.jsx";
import FlaggedBatches from "./pages/Dashboards/HospitalDashboard/FlaggedBatches.jsx";
import FeedbackReports from "./pages/Dashboards/HospitalDashboard/FeedbackReports.jsx";

// ✅ Optional: use API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/medicines`)
      .then((res) => console.log("✅ Connected to backend:", res.data))
      .catch((err) => console.error("❌ Backend error:", err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public/Home */}
        <Route path="/" element={<Home />} />

        {/* Patient */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/nearby-doctors" element={<NearbyDoctors />} />

        {/* Doctor */}
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />

        {/* Hospital */}
        <Route path="/dashboard/hospital" element={<HospitalDashboard />} />

        {/* Pharmacy */}
        <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />

        {/* NGO */}
        <Route
          path="/dashboard/ngo"
          element={
            <NGODashboard
              ngo={{
                organizationname: "Helping Hands Foundation",
                registrationno: "NGO-2025-001",
                website: "https://helpinghands.org",
                cause: "Medical Aid",
                donations: 50,
                location: {
                  area: "T. Nagar",
                  city: "Chennai",
                  state: "Tamil Nadu",
                  country: "India",
                },
              }}
            />
          }
        />

        {/* Admin */}
        <Route path="/dashboard/admin" element={<AdminPanel />} />
        <Route path="/admin/overview" element={<AdminOverview />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/flagged" element={<AIFlagged />} />
        <Route path="/admin/approvals" element={<NGOApprovals />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
         
        {/* Hospital */}
        <Route path="/hospital/inventory" element={<InventoryView />} />
        <Route path="/hospital/donate" element={<DonateMedicines />} />
        <Route path="/hospital/records" element={<DonationRecords />} />
        <Route path="/hospital/pickups" element={<PickupSchedule />} />
        <Route path="/hospital/flagged" element={<FlaggedBatches />} />
        <Route path="/hospital/reports" element={<FeedbackReports />} />

      </Routes>
    </Router>
  );
}

export default App;
