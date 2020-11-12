const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function createProfil() {
    const createProfilQuery = "INSERT INTO profile(first_name, last_name, date_of_birth) VALUES('', '' , '') RETURNING *"
    return pool.query(createProfilQuery);
}

async function createCredentials(email, password) {
    const createCredentialsQuery = "INSERT INTO credentials(email, password) VALUES($1, $2) RETURNING *"
    return pool.query(createCredentialsQuery, [email, password]);
}

async function createCompany() {
    const createCompanyQuery = "INSERT INTO company(airline, rank, date_of_entry) VALUES('', '' , '') RETURNING *"
    return pool.query(createCompanyQuery);
}

async function createLicense() {
    const newLicenseDetailsId = (await createLicenseDetails()).rows[0].id;
    const newRatingDetailsId = (await createRatingDetails()).rows[0].id;
    const createLicenseQuery = "INSERT INTO license(license_title, state_of_issue, country_code, license_details, rating_details) VALUES('' , '', '', $1, $2) RETURNING *"
    return pool.query(createLicenseQuery, [newLicenseDetailsId, newRatingDetailsId]);
}

async function createLicenseDetails() {
    const createLicenseDetailsQuery = "INSERT INTO license_details(license_number, elp, remarks, elp_expiration, expiration_date, date_of_issue) VALUES('', '0' , '', '', '', '') RETURNING *"
    return pool.query(createLicenseDetailsQuery);
}

async function createRatingDetails() {
    const createRatingDetailsQuery = "INSERT INTO rating_details(rating_remarks , rating_name, rating_expiration) VALUES('', '' , '') RETURNING *"
    return pool.query(createRatingDetailsQuery);
}

async function createMedical() {
    const createNewMedical = "INSERT INTO medical(issue_date, medical_remark, class1_exp, class2_exp, lapl_exp) VALUES('', '' , '', '', '') RETURNING *"
    return pool.query(createNewMedical);
}

async function createNewUser(email, password) {
    const newProfileId = (await createProfil()).rows[0].id;
    const newCredentialsId = (await createCredentials(email, password)).rows[0].id;
    const newCompanyId = (await createCompany()).rows[0].id;
    const newLicenseId = (await createLicense()).rows[0].id;
    const newMedicalId = (await createMedical()).rows[0].id;
    const createNewUser = "INSERT INTO users(profile_id, credentials_id, company_id, license_id, medical_id) VALUES($1, $2, $3, $4, $5) RETURNING *"
    return pool.query(createNewUser, [newProfileId, newCredentialsId, newCompanyId, newLicenseId, newMedicalId])
}

module.exports = {createNewUser}