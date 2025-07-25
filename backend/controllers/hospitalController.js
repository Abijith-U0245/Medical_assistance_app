const Hospital = require('../models/hospital');
const Medicine = require('../models/medicine');
const Donation = require('../models/Donation');

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

// 1. Inventory Overview
exports.getInventoryOverview = async (req, res) => {
    try {
        const totalMedicines = await Medicine.countDocuments();
        const expiringSoon = await Medicine.find({ expiryDate: { $lte: new Date(Date.now() + 30*24*60*60*1000) } });

        res.json({ success: true, data: { totalMedicines, expiringSoon: expiringSoon.length } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
    }
};

// 2. Donate Medicines
exports.donateMedicine = async (req, res) => {
    try {
        const { medicineId, ngoId, quantity } = req.body;

        const medicine = await Medicine.findById(medicineId);
        if (!medicine || medicine.quantity < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock or invalid medicine' });
        }

        medicine.quantity -= quantity;
        await medicine.save();

        const donation = await Donation.create({
            hospital: req.user._id,
            medicine: medicineId,
            ngo: ngoId,
            quantity
        });

        res.status(201).json({ success: true, data: donation });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to donate medicine' });
    }
};

// 3. Donation Records
exports.getDonationRecords = async (req, res) => {
    try {
        const donations = await Donation.find({ hospital: req.user._id }).populate('medicine ngo');
        res.json({ success: true, data: donations });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch donations' });
    }
};

// 4. Pickup Schedule
exports.getPickupSchedule = async (req, res) => {
    try {
        // Mocked pickup for demo
        const pickups = [
            { ngo: 'HopeCare NGO', time: '4PM Today', location: 'Main Hospital Gate' }
        ];
        res.json({ success: true, data: pickups });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch pickup schedule' });
    }
};

// 5. Flagged Stock
exports.getFlaggedStock = async (req, res) => {
    try {
        const flagged = await Medicine.find({ aiFlagged: true });
        res.json({ success: true, data: flagged });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve flagged stock' });
    }
};

// 6. Feedback & Reports
exports.getReports = async (req, res) => {
    try {
        const reports = [
            { month: 'June', feedback: 'NGOs reported excellent coordination' },
            { month: 'July', feedback: 'Some medicines close to expiry on pickup' }
        ];
        res.json({ success: true, data: reports });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch reports' });
    }
};