const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: [2, "Too short"],
			maxlength: [32, "Too long"],
		},
		slug: {
			type: String,
			lowercase: true,
			unique: true,
			index: true,
		},
		image: {
			url: String,
			key: String,
		},
		content: {
			type: {},
			min: 20,
			max: 2000000,
		},
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
