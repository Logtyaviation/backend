const { Client } = require('pg');
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {
  client.connect().then(() => {
    const q = `INSERT INTO users(email, password) VALUES('${req.body.email}', '${req.body.password}');`
    client.query(q).then(() => {
      client.end()
      res.send('Success!')
    })
  } )
});

module.exports = router;
