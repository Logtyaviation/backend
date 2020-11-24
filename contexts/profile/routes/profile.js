var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile')

router.get('/details', profileController.getProfile);

router.post('/save', profileController.saveProfile)

module.exports = router;