var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var likeUserSchema = Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    likedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String
},
    {timestamps: true}
)

module.exports = mongoose.model('LikedUser', likeUserSchema);