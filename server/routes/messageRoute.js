var express = require('express');
var messageController = require('../controllers/messageController');

module.exports = (app) => {
    var router = express.Router();
    /*
    * MESSAGE ROUTE
    */
    router.get('/messages', messageController.getAll)
    router.post('/messages', messageController.createMessage);
    router.get('messages/:id', messageController.getOne);
    router.put('messages/:id', messageController.updateMessage);
    router.delete('/messages', messageController.deleteMessage);
    router.post('/messages/byRoom', messageController.getMessageByRoom);
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
