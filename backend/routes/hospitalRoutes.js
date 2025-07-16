const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospitalController');

router.post('/', HospitalController.createHospital);
router.get('/', HospitalController.getAllHospitals);
router.get('/:id', HospitalController.getHospitalById);
router.put('/:id', HospitalController.updateHospital);
router.delete('/:id', HospitalController.deleteHospital);
router.patch('/:id/increment-donations', HospitalController.incrementDonations);

module.exports = router;
