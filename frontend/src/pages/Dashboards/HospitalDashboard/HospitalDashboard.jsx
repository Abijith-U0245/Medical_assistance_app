import React, { useEffect, useState } from 'react';
import './HospitalDashboard.css';
import { useNavigate } from 'react-router-dom';

function HospitalDashboard() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [flagged, setFlagged] = useState(null);
  const [reports, setReports] = useState(null);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAll = async () => {
      try {
        const inventoryRes = await fetch('/api/hospital/inventory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const inventoryData = await inventoryRes.json();
        if (inventoryData.success) setOverview(inventoryData.data);

        const pickupRes = await fetch('/api/hospital/pickups', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pickupData = await pickupRes.json();
        if (pickupData.success && pickupData.data.length > 0) {
          setPickup(pickupData.data[0]);
        }

        const flaggedRes = await fetch('/api/hospital/flagged', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const flaggedData = await flaggedRes.json();
        if (flaggedData.success) setFlagged(flaggedData.data.length);

        const reportRes = await fetch('/api/hospital/reports', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reportData = await reportRes.json();
        if (reportData.success) setReports(reportData.data);
      } catch (err) {
        console.error('Dashboard Load Error:', err);
        setError('Failed to load some sections.');
      }
    };

    fetchAll();
  }, []);

  const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { text: input, from: "user" }];
  setMessages(newMessages);
  setInput("");

  try {
    const res = await fetch(`${import.meta.env.VITE_CHATBOT_URL}/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input }),
});
    const data = await res.json();
    setMessages([...newMessages, { text: data.response, from: "bot" }]);
  } catch (err) {
    setMessages([
      ...newMessages,
      { text: "Error connecting to bot.", from: "bot" },
    ]);
  }
};

  return (
    <div className="hospital-dashboard">
      <header>
        <h1>Hospital Dashboard</h1>
        <p>Efficiently manage your medicine stock and donation activities.</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <h3>Inventory Overview</h3>
          <p>Total Medicines: {overview?.totalMedicines ?? '...'}</p>
          <p>Expiring Soon: {overview?.expiringSoon ?? '...'}</p>
          <button onClick={() => navigate('/hospital/inventory')}>View Inventory</button>
        </div>

        <div className="dashboard-card">
          <h3>Donate Medicines</h3>
          <p>Surplus or nearing expiry?</p>
          <button onClick={() => navigate('/hospital/donate')}>Donate Now</button>
        </div>

        <div className="dashboard-card">
          <h3>Donation Records</h3>
          <p>Track your previous donations to NGOs.</p>
          <button onClick={() => navigate('/hospital/records')}>View History</button>
        </div>

        <div className="dashboard-card">
          <h3>NGO Pickup Schedule</h3>
          <p>{pickup ? `Next: ${pickup.ngo} - ${pickup.time}` : 'No upcoming pickups'}</p>
          <button onClick={() => navigate('/hospital/pickups')}>View Schedule</button>
        </div>

        <div className="dashboard-card">
          <h3>Flagged Stock by AI</h3>
          <p>{flagged != null ? `${flagged} batches flagged` : 'Loading...'}</p>
          <button onClick={() => navigate('/hospital/flagged')}>Review Batches</button>
        </div>

        <div className="dashboard-card">
          <h3>Feedback & Reports</h3>
          <p>{reports?.[0]?.feedback ?? 'Loading latest report...'}</p>
          <button onClick={() => navigate('/hospital/reports')}>Read Reports</button>
        </div>
      </section>

      <div className="chatbot-icon" onClick={() => setChatOpen(!chatOpen)}>💬</div>

      {chatOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalDashboard;
