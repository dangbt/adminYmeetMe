var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = Schema({
    content: String,
    whoInHere: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Address', addressSchema);