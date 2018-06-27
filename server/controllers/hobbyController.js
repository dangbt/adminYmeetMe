var mongoose = require('mongoose');
var Hobby = mongoose.model('Hobby');

var hobbies= {
		getAll: (req, res) => {
			Hobby.find({}).populate({path: 'whoLikeThis.userID'}).exec((err, hobbies) => {
				if(err)
					res.send(err);
					res.json(hobbies);
			})
		},

		createHobby: (req, res) => {
			var newHobby = new Hobby(req.body);
			newHobby.save((err, hobby) => {
				if(err)
					res.send(err);
				res.json(hobby);
			})
		},

		getOne: (req, res) => {
			Hobby.findOne({id: req.params.id},(err, hobby) => {
				if(err)
					res.send(err);
				res.json(hobby);
			})
		},
		updateHobby: (req, res) => {
			var newHobby = req.body;
			Hobby.findOneAndUpdate({id: req.params.id},newHobby,(err, hobby) => {
				if(err)
					res.send(err);
				res.json(hobby);
			})
		},
		//findByIdAndRemove luôn dùng _id
		deleteHobby: (req, res) => {
				Hobby.findByIdAndRemove(req.body._id,(err, hobby) => {
				if(err)
					res.send(err);
				res.status(200).send("Delete successful !!!").end();
			})
	}
}
module.exports = hobbies;