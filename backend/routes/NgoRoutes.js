const express = require('express');
const router = express.Router();
const {uploadNgo} = require('../controllers/NgoController');

router.post('/', uploadNgo);

module.exports = router;
