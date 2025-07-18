const Medicine = require('../models/medicine');
const User = require('../models/user');
const NGO = require('../models/ngo');
const Feedback = require('../models/feedback');

// 1. Overview: all activities
exports.getOverview = async (req, res) => {
    try {
        const totalMedicines = await Medicine.countDocuments();
        const flaggedDonations = await Medicine.find({ aiFlagged: true });
        const totalUsers = await User.countDocuments();
        const totalNGOs = await NGO.countDocuments();

        res.json({
            success: true,
            data: {
                totalMedicines,
                totalUsers,
                totalNGOs,
                flaggedDonations
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch overview' });
    }
};

// 2. Manage users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
};

exports.toggleUserAccess = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.isActive = !user.isActive;
        await user.save();

        res.json({ success: true, message: `User ${user.isActive ? 'enabled' : 'disabled'}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to toggle user access' });
    }
};

// 3. AI flagged donations
exports.getAIFlaggedDonations = async (req, res) => {
    try {
        const flagged = await Medicine.find({ aiFlagged: true });
        res.json({ success: true, data: flagged });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch AI flagged donations' });
    }
};

// 4. Approval Queue (NGO approvals)
exports.getApprovalQueue = async (req, res) => {
    try {
        const pendingNGOs = await NGO.find({ approved: false });
        res.json({ success: true, data: pendingNGOs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch approval queue' });
    }
};

exports.approveNGO = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.ngoId);
        if (!ngo) return res.status(404).json({ success: false, message: 'NGO not found' });

        ngo.approved = true;
        await ngo.save();

        res.json({ success: true, message: 'NGO approved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to approve NGO' });
    }
};

// 5. Analytics (monthly stats)
exports.getAnalytics = async (req, res) => {
    try {
        const totalMedicines = await Medicine.countDocuments();
        const rejectedDonations = await Medicine.find({ rejected: true }).countDocuments();
        const verifiedDeliveries = await Medicine.find({ isVerified: true }).countDocuments();

        res.json({
            success: true,
            data: {
                totalMedicines,
                rejectedDonations,
                verifiedDeliveries
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
    }
};

// 6. Feedback and issues
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json({ success: true, data: feedbacks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch feedback' });
    }
};
