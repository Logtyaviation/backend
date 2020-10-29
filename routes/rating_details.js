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
    res.send('respond with rating details data');
});
router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO rating_details(rating_expiration, rating_remarks) VALUES('${req.body.rating_expiration}', '${req.body.rating_remarks}');`
        client.query(ar).then(() => {
            client.end()
            res.send('Rating details data saved!')
        })
    })
})

module.exports = router;