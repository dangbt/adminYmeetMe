var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var User = mongoose.model('User');

var images= {
	getAll: (req, res) => {
		Image.find({}).populate({ path: 'userID' }).exec((err, images) => {
			if(err)
				res.send(err);
			res.json(images);
		})
	},
	
	getOne: (req, res) => {
		Image.findOne({id: req.params.id},(err, image) => {
			if(err)
				res.send(err);
			res.json(image);
		})
	},

	updateImage: (req, res) => {
		var newImage = req.body;
		Image.findOneAndUpdate({id: req.params.id},newImage,(err, image) => {
			if(err)
				res.send(err);
			res.json(image);
		})
	},

	createImage: (req, res) => {
		// first, upload image to server
		// create new image in database with image's filepath
		// third, add imageID to user
		var newImage = new Image(req.body);
		newImage.save((err, data) => {
			if(err)
				res.json({ result: 0, msg: `Error while creating image!`, data: err });
			else {
				// // create complete, add image ID to user
				User.findOneAndUpdate({_id: req.body.userID}, {$push: {"images": data._id}}, (err1, data1)=>{
					if (err1)
						res.json({ result: 0, msg: `Error while adding image!`, data: {} });
					else
						res.json({ result: 1, msg: "Add image successful!", data: data1  });
				});
			}
		})
	},

	deleteImage: (req, res) => {
		// first, remove image in user
		// second, delete Image
		User.findOneAndUpdate({_id: req.body.userID}, {$pull: {"images": req.body.imageID}}, (err, data)=>{
			if (err)
				res.json({ result: 0, msg: `Error while removing image!`, data: {} });
			else
				//remove success -> delete image
				Image.findByIdAndRemove(req.body.imageID,(err1, data1) => {
					if (err1 || !data1)
						res.json({ result: 0, msg: `Error while delete image!`, data: {} });
					else
						res.json({ result: 1, msg: "Delete image successful!", data: data || {} });
				});
		});
	}
}
module.exports = images;