const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

async function getLicense(user_id) {
    const getLicense = `SELECT 
    license.license_title, 
    license.state_of_issue, 
    license.country_code,
    license_details.license_number,
    license_details.elp,
    license_details.remarks,
    license_details.elp_expiration,
    license_details.expiration_date,
    license_details.date_of_issue,
    rating_details.rating_name,
    rating_details.rating_expiration,
    rating_details.rating_remarks
    FROM license 
    JOIN license_details 
    ON license.id=(SELECT license_id FROM users WHERE users.id=$1)
    AND license_details.id=license.license_details 
    JOIN rating_details
    ON license.id=(SELECT license_id FROM users WHERE users.id=$1)
    AND rating_details.id=license.rating_details;`;
    return pool.query(getLicense, [user_id])
}

async function saveLicense({ license_title, state_of_issue, country_code }, user_id) {
    const saveLicense = `UPDATE license SET
    license_title=$1,
	state_of_issue=$2,
    country_code=$3
    WHERE id=(SELECT license_id FROM users WHERE users.id=$4)`
    return pool.query(saveLicense, [license_title, state_of_issue, country_code, user_id])
}

async function saveLicenseDetails({ license_number, elp, remarks, elp_expiration, expiration_date, date_of_issue }, user_id) {
    const saveLicenseDetails = `UPDATE license_details SET
    license_number=$1, 
    elp=$2,
    remarks=$3, 
    elp_expiration=$4, 
    expiration_date=$5, 
    date_of_issue=$6
    WHERE id=(SELECT license_details.id FROM license WHERE license.id=(SELECT license_id FROM users WHERE users.id=$7))`
    return pool.query(saveLicenseDetails, [license_number, elp, remarks, elp_expiration, expiration_date, date_of_issue, user_id])
}

async function saveRatingDetails({ rating_remarks, rating_name, rating_expiration }, user_id) {
    const saveRatingDetails = `UPDATE rating_details SET
    rating_remarks=$1,
    rating_name=$2,
    rating_expiration=$3
    WHERE id=(SELECT rating_details.id FROM license WHERE license.id=(SELECT license_id FROM users WHERE users.id=$4))`
    return pool.query(saveRatingDetails, [rating_remarks, rating_name, rating_expiration, user_id])
}

module.exports = { getLicense, saveLicense, saveLicenseDetails, saveRatingDetails }