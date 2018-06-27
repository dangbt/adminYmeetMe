var express = require('express');
var notificationController = require('../controllers/notificationController');

module.exports = (app) => {
    var router = express.Router();
    /*
    * NOTIFICATION ROUTE
    */
    router.get('/notifications', notificationController.getAll)
    router.post('/notifications', notificationController.createNotification); // body: title, content, userID
    router.get('notifications/:id', notificationController.getOne);
    router.put('notifications/:id', notificationController.updateNotification);
    router.delete('/notifications', notificationController.deleteNotification); // body: userID, notificationID
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
