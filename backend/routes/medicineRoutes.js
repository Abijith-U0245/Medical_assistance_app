const express = require('express');
const router = express.Router();
const { uploadMedicine } = require('../controllers/medicineController');

router.post('/', uploadMedicine);

module.exports = router;
