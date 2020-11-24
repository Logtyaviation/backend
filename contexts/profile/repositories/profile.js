const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function getProfile(user_id) {
    const getProfileDetails = "SELECT last_name, first_name, date_of_birth, other_last_name, other_first_name FROM profile WHERE id=(SELECT profile_id FROM users WHERE users.id=$1);";
    return pool.query(getProfileDetails, [user_id])
}

async function saveProfile({ first_name, last_name, date_of_birth, other_last_name, other_first_name }, user_id) {
    const saveProfile = "UPDATE profile SET first_name=$1, last_name=$2, date_of_birth=$3, other_first_name=$4, other_last_name=$5 WHERE id=(SELECT profile_id FROM users WHERE users.id=$6)";
    return pool.query(saveProfile, [first_name, last_name, date_of_birth,other_first_name, other_last_name, user_id])
}

module.exports = { getProfile, saveProfile }