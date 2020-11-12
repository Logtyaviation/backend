const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function getProfileDetails(user_id) {
    const getProfileDetails = "SELECT last_name, first_name, date_of_birth FROM profile WHERE id=$1";
    return pool.query(getProfileDetails, [user_id])
}

module.exports = { getProfileDetails }