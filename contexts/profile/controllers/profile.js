const profileRepository = require('../repositories/profile')

const hasFoundUser = (result) => result.rows.length > 0

function getDetails(req, res) {
    const { user_id } = req.session
    // if(user_id) {
        profileRepository.getProfileDetails('6')
        .then(result => {
            if(hasFoundUser(result)) {
                const profile = result.rows[0];
                return res.send(profile);
            } 
            throw(new Error('no profile'))
        })
        .catch(error => res.status(500).send(error.message))
    // } else {
    //     res.status(401).send('unauthenticated')
    // }
}

module.exports = { getDetails }