const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('image'), medicineController.uploadMedicine);

router.post('/', medicineController.uploadMedicine);
router.get('/', medicineController.getAllMedicines);
router.get('/stats', medicineController.getMedicineStats);
router.post('/:id/distribute', medicineController.distributeMedicine);
router.get('/:id', medicineController.getMedicineById);
router.delete('/:id', medicineController.deleteMedicine);
router.get('/dashboard', medicineController.getMedicineDashboard);

// ✅ Now supports image upload
router.post('/donate', upload.single('image'), medicineController.publicMedicineDonation);

module.exports = router;
