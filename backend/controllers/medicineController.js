const Medicine = require('../models/medicine');
const axios = require('axios');

exports.getMedicineDashboard = async (req, res) => {
    try {
        const medicines = await Medicine.find().populate('distributedTo.ngo');

        const stats = {
            totalMedicines: medicines.length,
            totalStock: medicines.reduce((sum, med) => sum + med.quantity, 0),
            expired: medicines.filter(m => new Date(m.expiryDate) < new Date()).length,
            distributed: medicines.reduce((sum, med) => sum + (med.distributedTo.length || 0), 0)
        };

        res.json({
            success: true,
            data: {
                medicines,
                stats
            }
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to load dashboard' });
    }
};
// Upload new medicine with AI expiry verification
exports.uploadMedicine = async (req, res) => {
    try {
        const { name, imageUrl, quantity, type, location } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ success: false, message: 'Medicine image is required' });
        }

        // Step 1: Call AI API to verify expiry date from image
        const aiResponse = await axios.post('http://127.0.0.1:5001/ocr', { imageUrl });
        const expiryDate = aiResponse.data.expiry_date;

        if (!expiryDate) {
            return res.status(400).json({ success: false, message: 'AI could not detect a valid expiry date from image' });
        }

        // Step 2: Check expiry via AI validation
        const isValid = checkExpiryWithAI(expiryDate);
        if (!isValid) {
            return res.status(400).json({ success: false, message: 'AI detected medicine is expired' });
        }

        // Step 3: Save medicine
        const newMed = await Medicine.create({
            name,
            imageUrl,
            expiryDate,
            quantity,
            type,
            location,
            donatedBy: req.user?._id || null,
            isVerified: false
        });

        res.status(201).json({ success: true, data: newMed });
    } catch (error) {
        console.error('Upload Medicine Error:', error);
        res.status(500).json({ success: false, message: 'Failed to upload medicine' });
    }
};

// AI expiry checker logic
const checkExpiryWithAI = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return expiry > now;
};

// Get all medicines with optional filters and search
exports.getAllMedicines = async (req, res) => {
    try {
        const { search, type, expiry } = req.query;
        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        if (type) {
            filter.type = type;
        }

        if (expiry === 'valid') {
            filter.expiryDate = { $gte: new Date() };
        } else if (expiry === 'expired') {
            filter.expiryDate = { $lt: new Date() };
        }

        const medicines = await Medicine.find(filter);
        res.json({ success: true, data: medicines });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch medicines' });
    }
};

// Get dashboard statistics
exports.getMedicineStats = async (req, res) => {
    try {
        const totalMedicines = await Medicine.countDocuments();
        const totalStockResult = await Medicine.aggregate([
            { $group: { _id: null, totalStock: { $sum: "$quantity" } } }
        ]);

        const expired = await Medicine.countDocuments({ expiryDate: { $lt: new Date() } });

        const distributed = await Medicine.aggregate([
            { $unwind: "$distributedTo" },
            { $count: "distributedCount" }
        ]);

        res.json({
            totalMedicines,
            totalStock: totalStockResult[0]?.totalStock || 0,
            expired,
            distributed: distributed[0]?.distributedCount || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to retrieve stats' });
    }
};

// Distribute medicine to NGO
exports.distributeMedicine = async (req, res) => {
    try {
        const { ngoId, quantity } = req.body;
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) return res.status(404).json({ success: false, message: 'Medicine not found' });

        if (medicine.quantity < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        medicine.quantity -= quantity;
        medicine.distributedTo.push({
            ngo: ngoId,
            quantity,
            date: new Date()
        });

        await medicine.save();

        res.json({ success: true, message: 'Medicine distributed successfully', data: medicine });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to distribute medicine' });
    }
};

exports.getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ success: false, message: 'Medicine not found' });

        res.json({ success: true, data: medicine });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error retrieving medicine' });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const deleted = await Medicine.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Medicine not found' });

        res.json({ success: true, message: 'Medicine deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete medicine' });
    }
};
