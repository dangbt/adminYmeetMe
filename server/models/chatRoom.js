var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatRoomSchema = Schema({
    lastMessage: String,
    participants: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            index: true
        }
    ]
},
    {timestamps: true}
);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);