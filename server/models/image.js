var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageSchema = Schema({
    imageURL: String,
    message: String,
    userID: { type: Schema.Types.ObjectId, ref: 'User' } //owner
},
    {timestamps: true}
);

module.exports = mongoose.model('Image', imageSchema);