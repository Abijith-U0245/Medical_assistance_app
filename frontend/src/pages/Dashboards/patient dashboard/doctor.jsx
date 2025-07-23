import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/doctor.css";

const doctorsList = [
  {
    name: "dr. arjun mehta",
    specialization: "cardiologist",
    location: "chennai",
    available: true,
    startTime: "9:00 am",
    endTime: "12:00 pm"
  },
  {
    name: "dr. priya sharma",
    specialization: "dermatologist",
    location: "mumbai",
    available: false
  },
  {
    name: "dr. rajeev kumar",
    specialization: "ent",
    location: "delhi",
    available: true,
    startTime: "10:00 am",
    endTime: "1:00 pm"
  },
  {
    name: "dr. sneha iyer",
    specialization: "general physician",
    location: "chennai",
    available: false
  },
  {
    name: "dr. karan joshi",
    specialization: "pediatrician",
    location: "bangalore",
    available: true,
    startTime: "11:00 am",
    endTime: "2:00 pm"
  },
  {
    name: "dr. ananya gupta",
    specialization: "dentist",
    location: "hyderabad",
    available: false
  },
  {
    name: "dr. ramesh babu",
    specialization: "orthopedic",
    location: "mumbai",
    available: true,
    startTime: "8:00 am",
    endTime: "11:00 am"
  },
  {
    name: "dr. neha varma",
    specialization: "neurologist",
    location: "delhi",
    available: true,
    startTime: "2:00 pm",
    endTime: "5:00 pm"
  },
  {
    name: "dr. vikram singh",
    specialization: "psychiatrist",
    location: "kolkata",
    available: false
  },
  {
    name: "dr. meera kapoor",
    specialization: "gynecologist",
    location: "pune",
    available: true,
    startTime: "10:30 am",
    endTime: "1:30 pm"
  }
];

function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))];
}

function Doctor() {
  const navigate = useNavigate();

  const specializations = getUniqueValues(doctorsList, "specialization");
  const locations = getUniqueValues(doctorsList, "location");

  const [specializationFilter, setSpecializationFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctorsList.filter((doctor) => {
    return (
      (specializationFilter === "" || doctor.specialization === specializationFilter) &&
      (locationFilter === "" || doctor.location === locationFilter)
    );
  });

  return (
    <div className="nearby-doctors-container">
      <h2>nearby doctors</h2>

      <div className="filters">
        <select
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        >
          <option value="">filter by specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">filter by location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="doctor-list">
        {filteredDoctors.length === 0 && (
          <p>no doctors found matching your criteria.</p>
        )}

        {filteredDoctors.map((doctor, index) => (
          <div
            key={index}
            className={`doctor-card ${selectedDoctor === index ? "selected" : ""}`}
          >
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p><strong>specialization:</strong> {doctor.specialization}</p>
              <p><strong>location:</strong> {doctor.location}</p>
              <p className="availability">
                <span
                  className={`circle ${
                    doctor.available ? "available" : "not-available"
                  }`}
                ></span>{" "}
                {doctor.available
                  ? `available: ${doctor.startTime} - ${doctor.endTime}`
                  : "not available"}
              </p>
            </div>
            <button
              className="book-now-button"
              onClick={() => alert(`Booking appointment with ${doctor.name}`)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctor;
