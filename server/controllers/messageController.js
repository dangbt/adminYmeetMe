var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var ChatRoom = mongoose.model('ChatRoom');

var messages = {
	getAll: (req, res) => {
		Message.find({}).exec((err, messages) => {
			if (err)
				res.send(err);
			res.json(messages);
		})
	},

	getOne: (req, res) => {
		Message.findOne({ id: req.params.id }, (err, message) => {
			if (err)
				res.send(err);
			res.json(message);
		})
	},

	updateMessage: (req, res) => {
		var newMessage = req.body;
		Message.findOneAndUpdate({ id: req.params.id }, newMessage, (err, message) => {
			if (err)
				res.send(err);
			res.json(message);
		})
	},

	getMessageByRoom: (req, res) => {
		Message.find({ roomID: req.body.roomID })

			.sort({ 'createdAt': -1 })
			.limit()
			.populate({ path: 'senderID', select: 'info.fullName content avatar' })

			.exec((err, messages) => {
				if (err || messages.length < 1)
					res.json({ result: 0, msg: "There is no message in this room!", data: {} });

				else
					res.json({ result: 1, msg: "message", data: messages || {} });
			})
	},
	createMessage: (req, res) => {
		// if the room existed and sender in that room
		ChatRoom.find({
            $and: [
				{ '_id': req.body.roomID }, { 'participants':  req.session.user._id }
            ]}, (err, data) => {
			if(err || data.length < 1) // data = []
			res.json({ result: 0, msg: "Can't find room or you don't have permission!", data: data });
			
			else{
				// adding message with roomID
				var message = {
					senderID: req.session.user._id,
					content: req.body.content,
					roomID: req.body.roomID
				}
				var newMessage = new Message(message);
				newMessage.save((err, message) => {
					if (err || !message)
						res.json({ result: 0, msg: "Error while adding message!", data: {} });
					else{
						ChatRoom.findOneAndUpdate({_id: req.body.roomID}, {"lastMessage": req.body.content}, (err, chatRoom) => {
							if (err) {
								res.json({ result: 0, msg: `Server error`, data: {} });
							} else{
								res.json({ result: 1, msg: "Add message successful!", data: message || {} });
							}
						});
					}
				});
			}
		});
	},

		//findByIdAndRemove luôn dùng _id
	deleteMessage: (req, res) => {
		Message.findByIdAndRemove(req.body.id, (err, message) => {
			if (err)
				res.send(err);
			res.status(200).send("Delete successful !!!").end();
		})
	}
}
module.exports = messages;