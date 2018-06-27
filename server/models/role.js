var  mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roleSchema = Schema({
  id: String,
  name: String
})
module.exports = mongoose.model('Role', roleSchema);
