var mongoose = require('mongoose');
var Address = mongoose.model('Address');

var addresses = {
	getAll: (req, res) => {
		Address.find({}).exec((err, addresses) => {
		if(err)
		res.send(err);
		res.json(addresses);
	})
	},

	createAddress: (req, res) => {
	var newAddress = new Address(req.body);
	newAddress.save((err, address) => {
		if(err)
		res.send(err);
		res.json(address);
	})
	},

	getOne: (req, res) => {
	Address.findOne({id: req.params.id},(err, adress) => {
		if(err)
		res.send(err);
		res.json(adress);
	})
	},
	updateAddress: (req, res) => {
	var newAddress = req.body;
	Address.findOneAndUpdate({id: req.params.id},newAddress,(err, address) => {
		if(err)
		res.send(err);
		res.json(address);
	})
	}
};
module.exports = addresses;