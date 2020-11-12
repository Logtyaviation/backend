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
    if(req.session.user_id != null) {
        'select '
        client.connect().then(() => {

            let rating_details_query = 
            `INSERT INTO rating_details(rating_name, rating_expiration, rating_remarks) VALUES`

            req.body.rating_list.forEach((rating, index) => {
                rating_details_query += `('${rating.RatingName}', '${rating.RatingExpiration}', '${rating.RatingRemarks}')`
                if(req.body.rating_list.length !== index+1) {
                    rating_details_query += ','
                }
            })

            rating_details_query += 'RETURNING *;';

            client.query(rating_details_query)
                .then((rating_details_query_result) => {
                    console.log(rating_details_query_result)
                    const rating_details = rating_details_query_result.rows.map(row => {
                        return row.id
                    })
                    const ar = `INSERT INTO license(license_title, state_of_issue, country_code, rating_details) VALUES('${req.body.license_title}', '${req.body.state_of_issue}', '${req.body.country_code}', '{${rating_details}}');`
                    client.query(ar)
                    .then(() => {
                        client.end()
                        res.send('License details saved!')
                    })
                })
                .catch((err) => {
                    client.end()
                    console.log(err)
                })

            
        })
    }
})

module.exports = router;