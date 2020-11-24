const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function getCompany(user_id) {
    const getCompany = "SELECT airline, rank, date_of_entry FROM company WHERE id=(SELECT company_id FROM users WHERE users.id=$1);";
    return pool.query(getCompany, [user_id])
}

async function saveCompany(airline, rank, date_of_entry, user_id) {
    const saveCompany = "UPDATE company SET airline=$1, rank=$2, date_of_entry=$3 WHERE id=(SELECT company_id FROM users WHERE users.id=$4)";
    return pool.query(saveCompany, [airline, rank, date_of_entry, user_id])
}

module.exports = { getCompany, saveCompany }