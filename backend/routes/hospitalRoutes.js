const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes if auth used

// Inventory and operational routes
router.get('/inventory', HospitalController.getInventoryOverview);
router.post('/donate', HospitalController.donateMedicine);
router.get('/donations', HospitalController.getDonationRecords);
router.get('/pickups', HospitalController.getPickupSchedule);
router.get('/flagged', HospitalController.getFlaggedStock);
router.get('/reports',  HospitalController.getReports);

// CRUD for hospitals
router.post('/', HospitalController.createHospital);
router.get('/', HospitalController.getAllHospitals);
router.get('/:id', HospitalController.getHospitalById);
router.put('/:id', HospitalController.updateHospital);
router.delete('/:id', HospitalController.deleteHospital);
router.patch('/:id/increment-donations', HospitalController.incrementDonations);

module.exports = router;
