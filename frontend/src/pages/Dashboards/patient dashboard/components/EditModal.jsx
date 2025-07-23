import React, { useState } from "react";
import "../../styles/editprofile.css";

function EditModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          name="aadhar"
          value={form.aadhar}
          onChange={handleChange}
          placeholder="Aadhar ID"
        />
        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
