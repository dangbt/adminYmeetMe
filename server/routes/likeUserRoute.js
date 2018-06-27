
var express = require('express');
var likedUserController = require('../controllers/likedUserController');
var func_API = require('../controllers/func_api')

module.exports = (app) => {
    var router = express.Router();
    /*
    * LIKE_USER ROUTE
    */
    router.get('/likedUsers',func_API.authenticate, likedUserController.getAll)
    router.post('/likedUsers',func_API.authenticate, likedUserController.createLikedUser); // body: userID, likedBy, message
    router.get('likedUsers/:id',func_API.authenticate, likedUserController.getOne);
    router.get('/usersLikeMe',func_API.authenticate, likedUserController.getUserLikeMe); // body: _id
    router.post('/users/likedUser',func_API.authenticate, likedUserController.getLikedUser); // body: _id
    router.put('likedUsers/:id',func_API.authenticate, likedUserController.updateLikedUser);
    router.delete('/likedUsers',func_API.authenticate, likedUserController.deleteLikedUser);
    
    // prefixed all of routes with /api
    app.use('/api', router);
}
