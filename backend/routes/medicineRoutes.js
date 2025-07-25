const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

router.post('/', medicineController.uploadMedicine);
router.get('/', medicineController.getAllMedicines);
router.get('/stats', medicineController.getMedicineStats);
router.post('/:id/distribute', medicineController.distributeMedicine);
router.get('/:id', medicineController.getMedicineById);
router.delete('/:id', medicineController.deleteMedicine);
router.get('/dashboard', medicineController.getMedicineDashboard);

module.exports = router;
