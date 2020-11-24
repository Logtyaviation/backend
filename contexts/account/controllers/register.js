const registerRepository = require('../repositories/register')
const loginRepository = require('../repositories/login')

const hasUserMatch = (result) => result.rows.length > 0;
const emailAlreadyExists = new Error('Sorry, this email is already associated to an account')

function register(req, res) {
    const { email, password } = req.body
    loginRepository.getUserByEmail(email)
    .then(result => {
        if(hasUserMatch(result)) {
            throw emailAlreadyExists
        }
        registerRepository.createNewUser(email, password)
        .then(result => {
            res.send('Your account has been created!')
        })
    })
    .catch(error => res.status(400).send(error.message))
}

module.exports = { register }