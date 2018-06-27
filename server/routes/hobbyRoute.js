var express = require('express');
var hobbyController = require('../controllers/hobbyController');
var func_API = require('../controllers/func_api')

module.exports = (app) => {
    var router = express.Router();
    /*
    * HOBBY ROUTE
    */
    router.get('/hobbies',func_API.authenticate, hobbyController.getAll)
    .post('/hobbies',func_API.authenticate, hobbyController.createHobby);
    router.get('/hobbies/:id',func_API.authenticate, hobbyController.getOne);
    router.put('/hobbies/:id',func_API.authenticate, hobbyController.updateHobby);
    router.delete('/hobbies',func_API.authenticate, hobbyController.deleteHobby);
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
