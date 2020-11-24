const medicalRepository = require('../repositories/medical')

const hasFoundUser = (result) => result.rows.length > 0;

function getMedical(req, res) {
    const user_id = '2'
    if(user_id) {
        medicalRepository.getMedical(user_id)
        .then(result => {
            if(hasFoundUser(result)) {
                const medical = result.rows[0];
                return res.send(medical)
            }
            throw(new Error ('no profile'))
        })
        .catch(error => res.status(500).send(error.message))
    }
    else {
        res.status(401).send('unauthenticated')
    }
}

function saveMedical(req, res) {
    const user_id = '2'
    if(user_id) {
        medicalRepository.saveMedical(req.body, user_id)
        .then(result => {
            res.send('Your medical has been saved')
        })
        .catch(error => res.status(400).send(error.message))
    }
    else {
        res.send('unauthorized')
    }
}

module.exports = { getMedical, saveMedical }