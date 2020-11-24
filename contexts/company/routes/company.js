var express = require('express');
var router = express.Router();

const companyController = require('../controllers/company');

router.get('/details', companyController.getCompany);

router.post('/save', companyController.saveCompany);

module.exports = router;