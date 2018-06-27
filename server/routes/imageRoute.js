var express = require('express');
var imageController = require('../controllers/imageController');
var func_API = require('../controllers/func_api');

module.exports = (app) => {
    var router = express.Router();
    /*
    * IMAGE ROUTE
    */
    router.get('/images',func_API.authenticate, imageController.getAll)
    router.post('/images',func_API.authenticate, imageController.createImage); //body: imageURL, message, userID
    router.get('images/:id',func_API.authenticate, imageController.getOne);
    router.put('images/:id',func_API.authenticate, imageController.updateImage);
    router.delete('/images',func_API.authenticate, imageController.deleteImage); //body: imageID, userID
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
