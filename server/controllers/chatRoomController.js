var mongoose = require('mongoose');
var ChatRoom = mongoose.model('ChatRoom');
var Message = mongoose.model('Message');

var chatRooms = {
	getAll: (req, res) => {
		ChatRoom.find({}).populate({path: 'participants', select: 'info avatar'}).exec((err, chatRooms) => {
			if (err)
				res.send(err);
			res.json(chatRooms);
		})
	},

	getRoomByUser: (req, res) => {
		ChatRoom.find({ 'participants': req.session.user._id }).populate({path: 'participants', select: 'info avatar'}).exec ((err, chatRoom) => {

			if (err)
				res.json({ result: 0, msg: "Server Error", data: { err } });
			else {
				res.json({ result: 1, msg: "", data: chatRoom || {} });
			}

		})
	},
	getAllOfOne: (req, res) => {
		ChatRoom.find({ $in: [{ 'participants': req.session.user._id }] }, (err, rooms) => {
			if (err)
				res.send(err);
			res.json(rooms)
		})
	},

	updateChatRoom: (req, res) => {
		var newChatRoom = req.body;
		ChatRoom.findOneAndUpdate({ id: req.params.id }, newChatRoom, (err, chatRoom) => {
			if (err)
				res.send(err);
			res.json(chatRoom);
		})
	},

	createChatRoom: (req, res) => {
		let body = [];
		if (req.body.recipientID === req.session.user._id)
			body.push(req.session.user._id);
		else
			body = [req.session.user._id, req.body.recipientID];
		ChatRoom.find({ $and: [{ participants: { $all: body } }, { participants: { "$size": body.length } }] }, (err, room) => {
		
			if (room.length > 0) {
				res.json({ result: 0, msg: "Room existed", data: room[0] });
				}
				else {
					ChatRoom.create({ participants: body }, (err1, room) => {
						if (err1 || !room)
							res.json({ result: 0, msg: "Error while create Room!", data: {} });
						else
							res.json({ result: 1, msg: "Add Room successful!", data: room || {} });
					});
				}
			});

	},
	//findByIdAndRemove luôn dùng _id
	deleteChatRoom: (req, res) => {
		ChatRoom.findByIdAndRemove(req.body._id, (err, chatRoom) => {
			if (err)
				res.send(err);
			res.status(200).send("Delete successful !!!").end();
		})
	},
}
module.exports = chatRooms;