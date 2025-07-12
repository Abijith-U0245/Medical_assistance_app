// Simulated AI expiry check
const checkExpiryWithAI = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry > now;
};

const Medicine = require('../models/medicine');

exports.uploadMedicine = async (req, res) => {
  try {
    const { name, expiryDate, quantity, location } = req.body;

    const newMed = await Medicine.create({
      name,
      expiryDate,
      quantity,
      location,
      donatedBy: null, // Add user ID when auth is added
      isVerified: false
    });

    res.status(201).json({ success: true, data: newMed });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
