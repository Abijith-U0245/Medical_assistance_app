import React, { useState } from "react";
import "../styles/EventsPage.css";

const events = [
  {
    id: 1,
    title: "Free Health Checkup",
    organizer: "City Hospital",
    type: "hospital",
    description: "Free general health checkups for all age groups.",
  },
  {
    id: 2,
    title: "NGO Blood Donation Camp",
    organizer: "RedCross NGO",
    type: "ngo",
    description: "Donate blood and help save lives!",
  },
  {
    id: 3,
    title: "Pharmacy Discount Day",
    organizer: "MediSave Pharmacy",
    type: "discount",
    description: "Flat 40% off on medicines for 2 days!",
  },
  {
    id: 4,
    title: "Tablet Donation Drive",
    organizer: "Heal India",
    type: "donation",
    description: "Donate unused tablets to rural clinics.",
  },
];

const EventsPage = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [interests, setInterests] = useState({});

  const toggleInterest = (id) => {
    setInterests((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredEvents =
    selectedType === "all"
      ? events
      : events.filter((event) => event.type === selectedType);

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>

      <div className="filter-buttons">
        {["all", "ngo", "discount", "hospital", "donation"].map((type) => (
          <button
            key={type}
            className={selectedType === type ? "active" : ""}
            onClick={() => setSelectedType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="events-list">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`event-card ${interests[event.id] ? "interested" : ""}`}
            onClick={() => toggleInterest(event.id)}
          >
            <h3>{event.title}</h3>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p>{event.description}</p>
            <div className="interest-indicator">
              {interests[event.id] ? "✅ Interested" : "❌ Not Interested"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
