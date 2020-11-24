const companyRepository = require('../repositories/company')

const hasFoundUser = (result) => result.rows.length > 0

function getCompany(req, res) {
    const user_id='2'
    if(user_id) {
        companyRepository.getCompany(user_id)
        .then(result => {
            if(hasFoundUser(result)) {
                const company = result.rows[0]
                return res.send(company)
            }
            throw(new Error('No company associated to this profile'))
        })
        .catch(error => res.status(500).send(error.message))
    } else {
        res.status(401).send('unauthenticated')
    }
}

function saveCompany(req, res) {
    const user_id='2'
    if(user_id) {
        companyRepository.saveCompany( req.body, user_id )
        .then(result => {
            res.send('Your company details have been saved')
        })
        .catch(error => res.status(401).send(error.message))
    }
    else {
        res.send('unauthorized')
    }
}

module.exports = { getCompany, saveCompany }