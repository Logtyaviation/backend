const loginController = require('../controllers/login');
const registerController = require('../controllers/register')

var express = require('express');
var router = express.Router();

router.get('/authentification', function(req, res){
    if(req.session.user_id) {
        res.send('authentificated');
    } else {
        res.status(401).send('unauthenficated')
    }
});

router.get('/logout', function(req,res) {
    req.session.user_id = null;
    res.send('disconnect user');
})

router.post('/login', loginController.login);
router.post('/register', registerController.register)

module.exports = router