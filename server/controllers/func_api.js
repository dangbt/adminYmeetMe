var mongoose = require('mongoose');
var User = mongoose.model('User');
var session = require('express-session');
const bcrypt = require('bcrypt');


module.exports = {
	login: (req, res) => {
		try {
			var {
				username,
				password
			} = req.body;
		

			User.findOne({
				username: username
			}, function (err, data) {
				if (err) {
					res.status(500).end(err);
				} else {
					if (!data) {
						res.status(404).end('User not found');
					} else {
						if (isValidPassword(data, password)) {
							//set session ở đây
							req.session.regenerate(function() {
								// will have a new session here
								req.session.user = {
									_id: data._id,
									username: data.username,
									fullName: data.info.fullName,
									avatar: data.avatar
								}
								
								res.status(200).end('Logged in successfully');
							})
							 
						} else {
							res.status(401).end('Incorrect password');
						}
					}
				}
			})
		} catch (err) {
			res.status(500).end(err);
		}
		// var isValidPassword = function (user, password) {
		// 	//return bCrypt.compareSync(password, user.password);
		// 	return user.password === password;
		// }
		var isValidPassword = function (user, password) {
            return bcrypt.compareSync(password, user.password);
            //return user.password === password;
        }

	},
	logout: function (req, res) {
		try {
			req.session.destroy(function (err) {
				if (err) {
					res.status(500).end(err);
				}
				else {
					res.status(200).end('Logged out successfully');
				}
			})
		} catch (err) {
			res.status(500).end(err);
		}
	},
	authenticate: function (req, res, next) {
		try {
			if (req.session.user) {
				next();
			}
			else {
				res.status(401).end('No permission, need login');
			}
		} catch (err) {
			res.status(500).end(err);
		}
	},

	checkAuthenticate: function (req, res) {
		try {
			if (req.session.user) {
				res.json(req.session.user);
				
			}
			else {
				res.status(401).end('Not logged in');
			}
		} catch (err) {
			res.status(500).end(err);
		}
	},

}