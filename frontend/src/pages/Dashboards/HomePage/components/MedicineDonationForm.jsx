import React, { useState } from 'react';
import './MedicineDonationForm.css';

const MedicineDonationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    expiryDate: '',
    quantity: 1,
    type: '',
    location: '',
    donorName: '',
    contact: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("expiryDate", formData.expiryDate);
    form.append("quantity", formData.quantity);
    form.append("type", formData.type);
    form.append("location", formData.location);
    form.append("donorName", formData.donorName);
    form.append("contact", formData.contact);
    if (imageFile) form.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/medicines/donate", {
        method: "POST",
        body: form
      });

      const data = await res.json();

      if (res.ok) {
        alert("Medicine donation submitted!");
        onClose();
      } else {
        alert(data.message || "Error donating medicine");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close" onClick={onClose}>✕</button>
        <h2 className="popup-title">Donate Medicine</h2>
        <form onSubmit={handleSubmit} className="popup-form" encType="multipart/form-data">
          <input type="text" name="name" placeholder="Medicine Name" required onChange={handleChange} />
          <input type="file" name="image" accept="image/*" required onChange={handleImageChange} />
          <input type="date" name="expiryDate" required onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" min="1" required onChange={handleChange} />
          <input type="text" name="type" placeholder="Type (Tablet/Syrup)" onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} />
          <input type="text" name="donorName" placeholder="Your Name" required onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact Info" required onChange={handleChange} />
          <button type="submit" className="popup-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MedicineDonationForm;
