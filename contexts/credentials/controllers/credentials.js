const credentialsRepository = require('../repositories/credentials')

const hasFoundUser = (result) => result.rows.length > 0;

function getCredentials(req, res) {
    const user_id='2'
    if(user_id) {
        credentialsRepository.getCredentials(user_id)
        .then(result => {
            if(hasFoundUser(result)) {
                const credentials = result.rows[0];
                return res.send(credentials)
            }
            throw(new Error('no profile'))
        })
        .catch(error => res.status(500).send(error.message))
    }
    else {
        res.status(401).send('unauthenticated')
    }
}

function saveCredentials(req, res) {
    const user_id='2'
    if(user_id) {
        credentialsRepository.saveCredentials(req.body, user_id)
        .then(result => {
            res.send('Your credentials have been saved')
        })
        .catch(error => res.status(400).send(error.message))
    }
    else {
        res.send('unauthorized')
    }
}

module.exports = { getCredentials, saveCredentials }