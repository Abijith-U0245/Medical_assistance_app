const Hospital = require('../models/hospital');

// Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ message: 'Hospital created successfully', hospital });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create hospital', error: error.message });
  }
};

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hospitals', error: error.message });
  }
};

// Get a hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hospital', error: error.message });
  }
};

// Update hospital by ID
exports.updateHospital = async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital updated successfully', updatedHospital });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update hospital', error: error.message });
  }
};

// Delete hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hospital', error: error.message });
  }
};

// Increment donations done
exports.incrementDonations = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { $inc: { donations_done: 1 } },
      { new: true }
    );
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Donation count incremented', hospital });
  } catch (error) {
    res.status(500).json({ message: 'Failed to increment donation count', error: error.message });
  }
};
