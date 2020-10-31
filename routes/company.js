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
    res.send('respond with company details');
});
router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO company(airline, rank) VALUES('${req.body.airline}', '${req.body.rank}');`
        client.query(ar)
        .then(() => {
            client.end()
            res.send('Company details saved!')
        })
        .catch((err) => {
            client.end()
            console.log(err)
        })
    })
})

module.exports = router;