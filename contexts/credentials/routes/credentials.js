var express = require('express');
var router = express.Router();
const credentialsController = require('../controllers/credentials')

router.get('/details', credentialsController.getCredentials)
router.post('/save', credentialsController.saveCredentials)

module.exports = router