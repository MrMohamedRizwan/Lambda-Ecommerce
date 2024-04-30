const mongoose = require("mongoose");
const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const userschema = mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 12,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		salt: String,
		pwd: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "subscriber",
		},
		resetPasswordLink: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
);

userschema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.hashed_password);
};

userschema.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
});

module.exports = mongoose.model("users", userschema);
