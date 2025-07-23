const Medicine = require('../models/medicine'); // Required for nearby medicines
const Ngo = require('../models/ngo');

// Upload NGO data
exports.uploadNgo = async (req, res) => {
  try {
    const { organizationname, registrationno, website, cause, donations, location } = req.body;

    const requiredFields = ['area', 'city', 'state', 'country'];
    for (const field of requiredFields) {
      if (!location || !location[field]) {
        return res.status(400).json({ success: false, message: `Location field "${field}" is required.` });
      }
    }

    const existingNgo = await Ngo.findOne({ registrationno });
    if (existingNgo) {
      return res.status(400).json({ success: false, message: 'NGO with this registration number already exists.' });
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

    res.status(201).json({ success: true, data: newNgo });
  } catch (error) {
    console.error('Error uploading NGO:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all NGOs
exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find();
    res.json({ success: true, data: ngos });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch NGOs' });
  }
};

// Get NGO by ID
exports.getNgoById = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    if (!ngo) return res.status(404).json({ success: false, message: 'NGO not found' });
    res.json({ success: true, data: ngo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching NGO' });
  }
};

// Get NGO Profile by user ID
exports.getNgoProfile = async (req, res) => {
  try {
    const ngo = await Ngo.findOne({ user: req.user._id });
    if (!ngo) return res.status(404).json({ success: false, message: 'NGO not found' });

    res.json({ success: true, data: ngo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

// Get NGO Previous Medicine Purchases (assumes distributed meds tracked)
exports.getNgoPurchases = async (req, res) => {
  try {
    const medicines = await Medicine.find({ 'distributedTo.ngo': req.params.ngoId })
      .populate('distributedTo.ngo')
      .sort({ updatedAt: -1 });

    const purchases = medicines.map(med => {
      const record = med.distributedTo.find(d => d.ngo.toString() === req.params.ngoId);
      return {
        name: med.name,
        quantity: record.quantity,
        date: record.date,
        image: med.imageUrl
      };
    });

    res.json({ success: true, data: purchases });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch purchases' });
  }
};

// Get nearby available medicines
exports.getNearbyMedicines = async (req, res) => {
  try {
    const { city } = req.query;
    const meds = await Medicine.find({
      location: { $regex: city, $options: 'i' },
      quantity: { $gt: 0 },
      expiryDate: { $gte: new Date() }
    });

    res.json({ success: true, data: meds });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch medicines' });
  }
};

// NGO Custom Medicine Request
exports.requestNewMedicine = async (req, res) => {
  try {
    const { medicine, quantity, location } = req.body;
    const ngo = await Ngo.findOne({ user: req.user._id });
    if (!ngo) return res.status(404).json({ success: false, message: 'NGO not found' });

    ngo.requestedMedicines = ngo.requestedMedicines || [];
    ngo.requestedMedicines.push({ medicine, quantity, location });
    await ngo.save();

    res.json({ success: true, message: 'Request submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to request medicine' });
  }
};
