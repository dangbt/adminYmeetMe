var express = require('express');
var func_api = require('../controllers/func_api');
var userController = require('../controllers/userController');

module.exports = (app) => {
    var router = express.Router();

    router.post('/login', func_api.login);
    router.post('/logout', func_api.logout);
    router.post('/signup', userController.createUser);
    router.get('/session', func_api.checkAuthenticate);
    
    app.use('/api', router);
}
