const Pharmacy = require('../models/pharmacy');
const Donation = require('../models/Donation');
const Request = require('../models/request');

// Upload Pharmacy Info (Already existing, small tweaks added)
exports.uploadPharmacy = async (req, res) => {
  try {
    const {
      pharmacyname,
      registrationno,
      website,
      services,
      location // { area, city, state, country }
    } = req.body;

    // Basic field validation
    if (!pharmacyname || !registrationno) {
      return res.status(400).json({ success: false, message: 'Pharmacy name and registration number are required.' });
    }

    const requiredLocationFields = ['area', 'city', 'state', 'country'];
    for (const field of requiredLocationFields) {
      if (!location || !location[field]) {
        return res.status(400).json({
          success: false,
          message: `Location field "${field}" is required.`
        });
      }
    }

    const existingPharmacy = await Pharmacy.findOne({ registrationno });
    if (existingPharmacy) {
      return res.status(400).json({
        success: false,
        message: 'Pharmacy with this registration number already exists.'
      });
    }

    const newPharmacy = await Pharmacy.create({
      user: req.user ? req.user._id : null,
      pharmacyname,
      registrationno,
      website,
      services,
      location
    });

    return res.status(201).json({ success: true, data: newPharmacy });

  } catch (error) {
    console.error('Error uploading pharmacy:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get Pharmacy Dashboard Details
exports.getPharmacyDashboard = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({ user: req.user._id });
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: 'Pharmacy not found' });
    }

    const donations = await Donation.find({ pharmacy: pharmacy._id });
    const requests = await Request.find({ pharmacy: pharmacy._id });

    return res.json({
      success: true,
      data: {
        pharmacy: {
          pharmacyname: pharmacy.pharmacyname,
          location: `${pharmacy.location.city}, ${pharmacy.location.state}`,
          donationsCount: donations.length,
          contact: req.user.phone || "Not provided"
        },
        requests,
        donations
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add Donation (Donation Form Submission)
exports.donateMedicine = async (req, res) => {
  try {
    const { medicineName, expiryDate, minimumCost, quantity, description } = req.body;

    const pharmacy = await Pharmacy.findOne({ user: req.user._id });
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: 'Pharmacy not found' });
    }

    const newDonation = await Donation.create({
      pharmacy: pharmacy._id,
      medicineName,
      expiryDate,
      minimumCost,
      quantity,
      description
    });

    return res.status(201).json({ success: true, data: newDonation });
  } catch (error) {
    console.error('Donate error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
