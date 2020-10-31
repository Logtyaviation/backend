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
    res.send('respond with license details data');
});
router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO license_details(license_number, date_of_issue, expiration_date, elp, elp_expiration, remarks) VALUES('${req.body.license_number}', '${req.body.date_of_issue}', '${req.body.expiration_date}', '${req.body.elp}', '${req.body.elp_expiration}', '${req.body.remarks}');`
        client.query(ar)
        .then(() => {
            client.end()
            res.send('License details data saved!')
        })
        .catch((err) => {
            client.end()
            console.log(err)
        })
    })
})

module.exports = router;