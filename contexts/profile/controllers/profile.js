const profileRepository = require('../repositories/profile')

const hasFoundUser = (result) => result.rows.length > 0

function getProfile(req, res) {
    //const { user_id } = req.session
    const user_id = '2';
    if(user_id) {
        profileRepository.getProfile(user_id)
        .then(result => {
            if(hasFoundUser(result)) {
                const profile = result.rows[0];
                return res.send(profile);
            } 
            throw(new Error('no profile'))
        })
        .catch(error => res.status(500).send(error.message))
    } else {
        res.status(401).send('unauthenticated')
    }
}

function saveProfile(req, res) {
    const { first_name, last_name, other_last_name, other_first_name, date_of_birth } = req.body
    // const { user_id } = req.session
    const user_id = '2'
    if(user_id) {
        //profileRepository.saveProfile( first_name, last_name, other_last_name, other_first_name, date_of_birth , user_id)
        profileRepository.saveProfile(req.body, user_id)
        .then( result => {
            res.send('Your profile has been saved')
        })
        .catch(error => res.status(400).send(error.message))
    }
    else {
        res.send('unauthorized')
    }
}

module.exports = { getProfile, saveProfile }