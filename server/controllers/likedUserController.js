var mongoose = require('mongoose');
var LikedUser = mongoose.model('LikedUser');
var User = mongoose.model('User');

var likedUsers = {

	getAll: (req, res) => {
		LikedUser.find({}).populate('User').exec((err, likedUsers) => {
			if (err)
				res.send(err);
			res.json(likedUsers);
		})
	},

	getOne: (req, res) => {
		LikedUser.findOne({ id: req.params.id }, (err, likedUser) => {
			if (err)
				res.send(err);
			res.json(likedUser);
		})
	},
	getUserLikeMe: (req, res) => {
        LikedUser.find({ 'likedBy': req. session.user._id})
        .sort({'createdAt': -1})
        .populate({path: 'userID'})
        .exec((err, likedUser) => {
            if (err)
                res.json({ result: 0, msg: "Server Error", data: { err } });
            else {
                res.json({ result: 1, msg: "", data: likedUser || {} });
            }
        })
	},
	getLikedUser: (req, res) => {
        LikedUser.find({ 'likedBy': req.body._id })
        .sort({'createdAt': -1})
        .populate({path: 'userID', select: 'info.fullName'})
        .exec((err, likedUser) => {
            if (err)
                res.json({ result: 0, msg: "Server Error", data: { err } });
            else {
                res.json({ result: 1, msg: "", data: likedUser || {} });
            }
        })
    },

	updateLikedUser: (req, res) => {
		var newLikedUser = req.body;
		LikedUser.findOneAndUpdate({ id: req.params.id }, newLikedUser, (err, likedUser) => {
			if (err)
				res.send(err);
			res.json(likedUser);
		})
	},

	createLikedUser: (req, res) => {
		LikedUser.findOne({ $and: [{ 'userID': req.session.user._id }, { 'likedBy': req.body.userID }] }, (err, likedUser) => {
			if (err, likedUser) {
				res.json({ result: 0, msg: "You have liked already!", data: likedUser || {} });
			} else {
				User.findOne({ $and: [{ '_id': req.session.user._id }, { 'friends': req.body.userID }] },
					(err, friend) => {
						if (friend)
							res.json({ result: 0, msg: "You are already friend with this person!", data: friend || {} });
						else {
							var temp ={
								userID : req.session.user._id,
								likedBy: req.body.userID 
							}
							var newLikedUser = new LikedUser(temp);
							newLikedUser.save((err, data) => {
								if (err)
									res.json({ result: 0, msg: `Error while creating request!`, data: {} });
								else {
									res.json({ result: 1, msg: "Add request successful!", data: data || {} });

								}
							});

						}
					});


			}
		});
	},

	deleteLikedUser: (req, res) => {
		LikedUser.findByIdAndRemove(req.body._id, (err, data) => {
			if (err)
				res.json({ result: 0, msg: `Error while deleting request!`, data: {} });
			else
				res.json({ result: 1, msg: "Delete request successful!", data: data || {} });
		})
	}
}
module.exports = likedUsers;