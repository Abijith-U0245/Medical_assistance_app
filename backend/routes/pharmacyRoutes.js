const express = require('express');
const router = express.Router();
const { uploadPharmacy } = require('../controllers/pharmacyController');

// POST /api/pharmacy — Upload pharmacy info
router.post('/', uploadPharmacy);

module.exports = router;
