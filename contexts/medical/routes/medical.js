var express = require('express');
var router = express.Router();
const medicalController = require('../controllers/medical');

router.get('/details', medicalController.getMedical);
router.post('/save', medicalController.saveMedical);

module.exports = router