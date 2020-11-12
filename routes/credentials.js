const { Client } = require('pg');
const client = new Client ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

var express = require('express');
const cookieParser = require('cookie-parser');
var router = express.Router();

router.use(cookieParser());

router.get('/', function(req, res, next){
    res.send('respond with a resource');
});

router.post('/login', function(req, res) {
    client.connect().then(() => {
        const get = 
    `SELECT * FROM users LEFT JOIN credentials ON users.credentials_id = credentials.id WHERE credentials.email='${req.body.email}'`;
        client.query(get)
        .then(sqlResult => {
            if(sqlResult.rows.length > 0) {
                const user = sqlResult.rows[0];
                if(user.password === req.body.password) {
                    req.session.user_id = user.id;
                    res.send('correct password!')
                    client.end();
                } else {
                    res.send('emchi neyek!')
                    client.end();
                }
            } else {
                res.send('not authorized!')
                client.end();
            }
        })
        
    });
    

    

})

router.post('/save', function(req, res, next){
    client.connect().then(() => {
        const ar = `INSERT INTO credentials(email, password, last_login) VALUES('${req.body.email}', '${req.body.password}', '${req.body.last_login}') RETURNING *;`
        client.query(ar)
        .then((queryResult) => {
            console.log(queryResult.rows[0].id)
            res.send('Credentials details saved!')
            client.end()
        })
        .catch((err) => {
            client.end()
            console.log(err)
        })
    })
})

module.exports = router;