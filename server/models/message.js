var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = Schema({
    senderID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
        type: String,
        required: true
    },
    imageURL: { type: String },
    roomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', index: true }
},
    { timestamps: true }
);
messageSchema.set('autoIndex', false);
module.exports = mongoose.model('Message', messageSchema);