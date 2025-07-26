const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');
const { protect } = require('../middleware/authMiddleware');


// Overview
router.get('/overview', protect, isAdmin, adminController.getOverview);

// User Management
router.get('/users', protect, isAdmin, adminController.getAllUsers);
router.patch('/users/:userId/toggle-access', protect, isAdmin, adminController.toggleUserAccess);
router.delete('/users/:userId', protect, isAdmin, adminController.deleteUser);

// AI Flagged Donations
router.get('/ai-flagged-donations', protect, isAdmin, adminController.getAIFlaggedDonations);

// NGO Approvals
router.get('/approval-queue', protect, isAdmin, adminController.getApprovalQueue);
router.post('/approve-ngo/:ngoId', protect, isAdmin, adminController.approveNGO);

// Analytics
router.get('/analytics', protect, isAdmin, adminController.getAnalytics);

// Feedback
router.get('/feedbacks', protect, isAdmin, adminController.getAllFeedback);
router.patch('/feedbacks/:feedbackId/resolve', protect, isAdmin, adminController.resolveFeedback);
router.delete('/feedbacks/:feedbackId', protect, isAdmin, adminController.deleteFeedback);

module.exports = router;
