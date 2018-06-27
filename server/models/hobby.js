var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hobbySchema = Schema({
    content: String,
    whoLikeThis: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
})

module.exports = mongoose.model('Hobby', hobbySchema);