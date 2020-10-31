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
        const ar = `INSERT INTO medical(issue_date, medical_remark, class1_exp, class2_exp, lapl_exp) VALUES('${req.body.issue_date}', '${req.body.medical_remarks}', '${req.body.class1_exp}', '${req.body.class2_exp}', '${req.body.lapl_exp}');`
        client.query(ar)
        .then(() => {
            client.end()
            res.send('Medical details saved!')
        })
        .catch((err) => {
            client.end()
            console.log(err)
        })
    })
})

module.exports = router;