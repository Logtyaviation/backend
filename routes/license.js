const { Client } = require('pg');
const client = new Client ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.send('respond with license data');
});
router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO license(license_title, state_of_issue, country_code, rating_name) VALUES('${req.body.license_title}', '${req.body.state_of_issue}', '${req.body.country_code}', '${req.body.rating_details}');`
        client.query(ar).then(() => {
            client.end()
            res.send('License details saved!')
        })
    })
})

module.exports = router;