var express = require('express');
var advertiseController = require('../controllers/advertiseController');

module.exports = (app) => {
    var router = express.Router();
    /*
    * ADVERTISE ROUTE
    */
    router.get('/advertises', advertiseController.getAll)
    router.post('/advertises', advertiseController.createAdvertise);
    router.get('/advertises/:id', advertiseController.getOne);
    router.put('/advertises/:id', advertiseController.updateAdvertise);
    router.delete('/advertises', advertiseController.deleteAdvertise);
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
