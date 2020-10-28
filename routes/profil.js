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
    res.send('respond with a resource');
});
router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO profil(first_name, last_name, date_of_birth) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.date_of_birth}');`
        client.query(ar).then(() => {
            client.end()
            res.send('Profil details saved!')
        })
    })
})

module.exports = router;