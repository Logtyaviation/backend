const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

async function getMedical(user_id) {
    const getMedical = `SELECT issue_date,
    medical_remark,
    class1_exp,
    class2_exp,
    lapl_exp
    FROM medical
    WHERE medical.id = (
        SELECT medical_id FROM users WHERE users.id=$1
    )`
    return pool.query(getMedical, [user_id])
}

async function saveMedical({ issue_date, medical_remark, class1_exp, class2_exp, lapl_exp }, user_id) {
    const saveMedical = `UPDATE medical SET
    issue_date=$1,
    medical_remark=$2,
    class1_exp=$3,
    class2_exp=$4,
    lapl_exp=$5
    WHERE id=(
        SELECT medical_id FROM users WHERE users.id=$6
    )`
    return pool.query(saveMedical, [issue_date, medical_remark, class1_exp, class2_exp, lapl_exp, user_id])
}

module.exports = { getMedical, saveMedical }