var express = require('express');
var router = express.Router();
const licenseController = require('../controllers/license');

router.get('/details', licenseController.getLicense)
router.post('/save', licenseController.saveLicense)

module.exports = router