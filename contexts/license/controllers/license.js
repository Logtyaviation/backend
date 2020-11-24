const licenseRepository = require('../repositories/license');

const hasFounderUser = (result) => result.rows.length > 0;

function getLicense(req, res) {
    const user_id = '2'
    const license_details_id = '4'
    if(user_id) {
        licenseRepository.getLicense(user_id, license_details_id)
        .then(result => {
            if(hasFounderUser(result)) {
                const license = result.rows[0];
                return res.send(license)
            }
            throw(new Error('no profile'))
        })
        .catch(error => res.status(500).send(error.message))
    }
    else {
        res.status(401).send('unauthenticated')
    }
}

function saveLicense(req, res) {
    const user_id = '2'
    if(user_id) {
        const promise1 = licenseRepository.saveLicense(req.body, user_id)
        const promise2 = licenseRepository.saveLicenseDetails(req.body, user_id)
        const promise3 = licenseRepository.saveRatingDetails(req.body, user_id)
        Promise.all([promise1, promise2, promise3])
        .then( result => {
            res.send('Your license has been saved')
        })
        .catch( error => res.status(400).send(error.message))
    }
    else {
        res.send('unauthorized')
    }
}

module.exports = { getLicense, saveLicense } 