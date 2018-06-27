var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');
var User = mongoose.model('User');


var notifications = {

	getAll: (req, res) => {
		Notification.find({}).populate('User').exec((err, notifications) => {
			if(err)
				res.send(err);
				res.json(notifications);
		})
	},
	
	getOne: (req, res) => {
		Notification.findOne({id: req.params.id},(err, notification) => {
			if(err)
			res.send(err);
			res.json(notification);
		})
	},
	updateNotification: (req, res) => {
		var newNotification = req.body;
		Notification.findOneAndUpdate({id: req.params.id},newNotification,(err, notification) => {
			if(err)
			res.send(err);
			res.json(notification);
		})
	},
	
	createNotification: (req, res) => {
		// first, create new notification
		// second, add notification to user
		var newNotification = new Notification(req.body);
		newNotification.save((err, data) => {
			if(err)
				res.json({ result: 0, msg: `Error while creating notification!`, data: {} });
			else{
				// create complete, add notification ID to user
				User.findOneAndUpdate({_id: req.body.userID}, {$push: {"notifications": data._id}}, (err1, data1)=>{
					if (err1 || !data1)
						res.json({ result: 0, msg: `Error while adding notification!`, data: {} });
					else
						res.json({ result: 1, msg: "Add notification successful!", data: data || {} });
				});
			}
		})
	},

	deleteNotification: (req, res) => {
		// first, remove notification in user
		// second, delete notification
		User.findOneAndUpdate({_id: req.body.userID}, {$pull: {"notifications": req.body.notificationID}}, (err, data)=>{
			if (err)
				res.json({ result: 0, msg: `Error while removing notification!`, data: {} });
			else
				//remove success -> delete notification
				Notification.findByIdAndRemove(req.body.notificationID,(err1, data1) => {
					if (err1 || !data1)
						res.json({ result: 0, msg: `Error while delete notification!`, data: {} });
					else
						res.json({ result: 1, msg: "Delete notification successful!", data: data || {} });
				});
		});
	}
}
module.exports = notifications;