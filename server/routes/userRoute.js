var express = require('express');
var userController = require('../controllers/userController');
var func_API = require('../controllers/func_api')

module.exports = (app) => {
    var router = express.Router();
    /*
     * USER ROUTE
     */
    router.get('/users',func_API.authenticate, userController.getAll);
    router.post('/users',userController.createUser);
    router.get('/users/:id',func_API.authenticate, userController.getOne);
    router.put('/users/:id',func_API.authenticate, userController.updateUser);
    router.delete('/users',func_API.authenticate, userController.deleteUser);
    router.post('/users/addHobby',func_API.authenticate, userController.addHobby);
    router.post('/users/removeHobby',func_API.authenticate, userController.removeHobby);
    router.post('/users/getFriends',func_API.authenticate, userController.getFriends); // body: _id, userID 
    router.post('/users/addFriend',func_API.authenticate, userController.addFriend); // body: _id, userID 
    router.post('/users/removeFriend',func_API.authenticate, userController.removeFriend); // body: _id, userID
    router.post('/users/blockUser',func_API.authenticate, userController.blockUser); // body: _id, userID
    router.post('/users/removeBlock',func_API.authenticate, userController.removeBlock); // body: _id, userID
    router.post('/users/addAddress',func_API.authenticate, userController.changeAddress); // body: userID, addressID
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
