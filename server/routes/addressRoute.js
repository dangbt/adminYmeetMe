var express = require('express');
var addressController = require('../controllers/addressController');

module.exports = (app) => {
    var router = express.Router();
    /*
    * ADDRESS ROUTE
    */
    router.get('/addresses', addressController.getAll);
    router.post('/addresses', addressController.createAddress); //content
    router.get('/addresses/:id', addressController.getOne);
    router.put('/addresses/:id', addressController.updateAddress);
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
