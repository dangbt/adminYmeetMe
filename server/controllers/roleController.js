var mongoose = require('mongoose');
var Role = mongoose.model('Role');

var roles = {
	getAll: (req, res) => {
		Role.find({}, (err, roles) => {
			if(err)
				res.send(err);
				res.json(roles);
		})
	},

	createRole: (req, res) => {
		var newRole = new Role(req.body);
		newRole.save((err, role) => {
			if(err)
				res.send(err);
			res.json(role);
		})
	}
}
module.exports = roles;