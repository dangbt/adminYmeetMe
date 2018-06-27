var  mongoose = require('mongoose');
var Schema = mongoose.Schema;
var advertiseSchema = Schema({
	title: String,
	content: String,
	image: String,
},
	{timestamps: true}
);
module.exports = mongoose.model('Advertise', advertiseSchema);
