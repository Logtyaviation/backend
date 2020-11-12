const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});



async function getUserByEmail(email) {
    const query = "SELECT * FROM users LEFT JOIN credentials ON users.credentials_id = credentials_id WHERE credentials.email = $1";
    return pool.query(query, [email])
}


module.exports = { getUserByEmail }