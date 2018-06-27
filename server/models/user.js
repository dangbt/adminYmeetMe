var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
	info:{
		fullName: { type: String, trim: true },
		gender: { type: String },
		birthday: { type: Date },
		height: { type: String },
		weight: { type: String },
		marialStatus: { type: String },
		introduce: { type: String },
		knowledge: { type: String },
		address: {type: String },
		country: { type: String },
	},
	occupation:{
		work: { type: String },
		salary: { type: String },
	},
	avatar: { type: String },
	contact:
	{
		email: {
			type: String,
			trim: true,
			lowercase: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
		},
		phone: {
			type: Number,
			trim: true,
			min: [10, 'Phone must have at least 10 numbers'],
			validate : {
				validator : Number.isInteger,
				message   : '{VALUE} is not an integer value'
			  },
			required: [true, 'User phone number required']
		  },
		web_page: { type: String }
	},
	username: {    
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        min: [6, 'Username must have at least 6 character'],
        match: [/[a-zA-Z0-9]\w[a-zA-Z0-9][\w]*/, 'Username must have at least 6 character']
    },

	password: { type: String, trim: true },
	hobbies: [
		{ type: Schema.Types.ObjectId, ref: 'Hobby' }
	],
	images: [
		{ type: Schema.Types.ObjectId, ref: 'Image' }
	],
	friends: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	listBlock: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	
},
	{ timestamps: true} // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
);
module.exports = mongoose.model('User', userSchema);
