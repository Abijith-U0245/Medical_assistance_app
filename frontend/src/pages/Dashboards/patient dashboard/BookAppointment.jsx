import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bookappointment.css";

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symptoms: "",
    specialization: "",
    location: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      location: formData.location,
      specialization: formData.specialization
    }).toString();
    navigate(`/nearby-doctors?${query}`);
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">🩺 Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          💬 Symptoms
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="e.g. Fever, cough"
            required
          />
        </label>

        <label>
          🔍 Specialization
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="">Select specialization</option>
            <option value="General">General Physician</option>
            <option value="Cardiology">Cardiologist</option>
            <option value="Dermatology">Dermatologist</option>
            <option value="Pediatrics">Pediatrician</option>
            <option value="Neurology">Neurologist</option>
          </select>
        </label>

        <label>
          📍 Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chennai, Delhi"
            required
          />
        </label>

        <label>
          📞 Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>

        <button type="submit" className="submit-btn">Search Doctors</button>
      </form>
    </div>
  );
}

export default BookAppointment;
