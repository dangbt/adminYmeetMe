var mongoose = require('mongoose');
var Advertise = mongoose.model('Advertise');

var advertises ={
		getAll: (req, res) => {
		Advertise.find({}).exec((err, advertises) => {
			if(err)
				res.send(err);
				res.json(advertises);
		})
	},

	createAdvertise: (req, res) => {
		var newAdvertise = new Advertise(req.body);
		newAdvertise.save((err, advertise) => {
			if(err)
				res.send(err);
			res.json(advertise);
		})
	},

	getOne: (req, res) => {
		Advertise.findOne({id: req.params.id},(err, advertise) => {
			if(err)
				res.send(err);
			res.json(advertise);
		})
	},

	updateAdvertise: (req, res) => {
		var newAdvertise = req.body;
		Advertise.findOneAndUpdate({id: req.params.id},newAdvertise,(err, advertise) => {
			if(err)
				res.send(err);
			res.json(advertise);
		})
	},
	//findByIdAndRemove luôn dùng _id
	deleteAdvertise: (req, res) => {
			Advertise.findByIdAndRemove(req.body.id,(err, advertise) => {
			if(err)
				res.send(err);
			res.status(200).send("Delete successful !!!").end();
		})
	}
}
module.exports = advertises;