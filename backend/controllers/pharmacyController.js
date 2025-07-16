const Pharmacy = require('../models/pharmacy');

exports.uploadPharmacy = async (req, res) => {
  try {
    const {
      pharmacyname,
      registrationno,
      website,
      services,
      location // { area, city, state, country }
    } = req.body;

    // Validate required location fields
    const requiredLocationFields = ['area', 'city', 'state', 'country'];
    for (const field of requiredLocationFields) {
      if (!location || !location[field]) {
        return res.status(400).json({
          success: false,
          message: `Location field "${field}" is required.`
        });
      }
    }

    // Check if registrationno already exists
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
