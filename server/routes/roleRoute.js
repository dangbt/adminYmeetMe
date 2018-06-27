var express = require('express');
var roleController = require('../controllers/roleController');

module.exports = (app) => {
    var router = express.Router();
    /*
    * ROLES ROUTE
    */
    router.get('/roles', roleController.getAll)
    .post('/roles', roleController.createRole);

    // prefixed all of routes with /api
    app.use('/api', router);
}
