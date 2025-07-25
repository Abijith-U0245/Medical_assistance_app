const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Overview
router.get('/overview', adminController.getOverview);

// User Management
router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/toggle-access', adminController.toggleUserAccess);

// AI flagged donations
router.get('/ai-flagged-donations', adminController.getAIFlaggedDonations);

// NGO Approval Queue
router.get('/approval-queue', adminController.getApprovalQueue);
router.post('/approve-ngo/:ngoId', adminController.approveNGO);

// Analytics
router.get('/analytics', adminController.getAnalytics);

// Feedback
router.get('/feedbacks', adminController.getAllFeedback);

module.exports = router;
