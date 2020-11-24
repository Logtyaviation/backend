const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function getCredentials(user_id) {
    const getCredentials = "SELECT email, password FROM credentials WHERE id=(SELECT credentials_id FROM users WHERE users.id=$1)"
    return pool.query(getCredentials, [user_id])
}

async function saveCredentials({ email, password }, user_id) {
    const saveCredentials = `UPDATE credentials SET
    email=$1,
    password=$2
    WHERE id=(SELECT credentials_id FROM users WHERE users.id=$3)`
    return pool.query(saveCredentials, [email, password, user_id])
}

module.exports = { getCredentials, saveCredentials }