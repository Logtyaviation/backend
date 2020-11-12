const loginRepository = require('../repositories/login');

const hasUserMatch = (result) => result.rows.length > 0;
const isCorrectPassword = (user, password) => user.password === password;

const incorrectEmailOrPasswordError = new Error('Incorrect email or password');

function login(req, res) {
    const { email, password } = req.body;
    loginRepository.getUserByEmail(email)
    .then(result => {
        if(hasUserMatch(result)) {
            const user = result.rows[0];
            if(isCorrectPassword(user, password)) {
                req.session.user_id = user.id;
                return res.send('Correct password!');
            }
            throw incorrectEmailOrPasswordError
        } 
        throw incorrectEmailOrPasswordError;
    })
    .catch(error => {
        res.status(400).send(error.message);
    })
}

module.exports = { login }