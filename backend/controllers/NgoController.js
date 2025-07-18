const Ngo = require('../models/ngo');

exports.uploadNgo = async (req, res) => {
  try {
    const {
      organizationname,
      registrationno,
      website,
      cause,
      donations,
      location // should be { area, city, state, country }
    } = req.body;

    // Check for missing required location fields
    const requiredLocationFields = ['area', 'city', 'state', 'country'];
    for (const field of requiredLocationFields) {
      if (!location || !location[field]) {
        return res.status(400).json({
          success: false,
          message: `Location field "${field}" is required.`
        });
      }
    }

    // Check for existing NGO with same registration number
    const existingNgo = await Ngo.findOne({ registrationno });
    if (existingNgo) {
      return res.status(400).json({
        success: false,
        message: 'NGO with this registration number already exists.'
      });
    }

    const newNgo = await Ngo.create({
      user: req.user ? req.user._id : null,
      organizationname,
      registrationno,
      website,
      cause,
      donations,
      location
    });

    return res.status(201).json({ success: true, data: newNgo });
  } catch (error) {
    console.error('Error uploading NGO:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
