const CategoryModel = require("../models/category");
// const linkModel = require("../models/link");
const fs = require("fs");
const slugify = require("slugify");
const formidable = require("formidable");
const uuidv4 = require("uuid/v4");
const AWS = require("aws-sdk");
var colors = require("colors");
const linkModel = require("../models/linkModel");
const userschema = require("../models/userModel");
// AWS S3
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const create = (req, res) => {
	let form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Image could not be uploaded, error in parsing" });
		}

		const { name, content } = fields;
		const { image } = files;
		const slug = slugify(name);

		if (image.size > 200000000) {
			return res.status(400).json({ error: "Reduce the size of the image" });
		}

		const fileStream = fs.createReadStream(image.path);
		const params = {
			Bucket: "ecommercenextnodee",
			Key: `category/${uuidv4()}_${image.name}`,
			Body: fileStream,
			ACL: "public-read",
			ContentType: image.type,
		};

		// Attempt to upload to S3
		s3.upload(params, (err, data) => {
			let imageUrl = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"; // Default image URL

			if (!err) {
				imageUrl = data.Location; // Use the uploaded image URL if successful
			} else {
				console.error(`Upload to S3 failed: ${err.message}`);
			}

			let category = new CategoryModel({
				name,
				content,
				slug,
				image: {
					url: imageUrl, // Use the image URL (default or S3)
					key: !err ? data.Key : null, // Set the key only if the upload was successful
				},
				postedBy: req.user._id,
			});

			category.save((err, success) => {
				if (err) {
					return res
						.status(400)
						.json({ error: `Error saving to DB: ${err.message}` });
				}
				return res.json({ success });
			});
		});
	});
};

const list = (req, res) => {
	CategoryModel.find({}).exec((err, data) => {
		if (err) {
			return res.status(400).json({ error: "Category not found" });
		}
		res.json(data);
	});
};
7;
const read = (req, res) => {
	const { slug } = req.params;
	let limit = req.body.limit ? parseInt(req.body.limit) : 10;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;
	console.log(req.params.slug, limit, skip);
	CategoryModel.findOne({ slug })
		// .then((category) => {
		// 	console.log("category", category);
		// 		})
		.populate("postedBy", "_id username name")
		.exec((err, category) => {
			if (err || !category) {
				return res.status(400).json({ error: `Category not found ${err}` });
			}
			// res.json({ message: category });
			linkModel
				.find({ categories: category })

				.populate("postedBy", "_id name username")
				.populate("categories", "name")

				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(skip)
				.exec((err, links) => {
					console.log("Links length:", links.length);
					if (err) {
						return res.status(400).json({ error: `Links not found ${err}` });
					}
					res.json({ category: category, links: links });
				});
		});
};

const update = (req, res) => {
	const { slug } = req.params;
	// const { name, image, content } = req.body;
	let form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Image could not be uploaded error in parsing" });
		}
		const { name, content } = fields;
		// console.log(name, content);

		const { image } = files;
		CategoryModel.findOneAndUpdate(
			{ slug },
			{ name, content },
			{ new: true },
		).exec((err, updated) => {
			console.log("updated", updated);
			if (err || !updated) {
				return res.status(400).json({ error: "Category not updated" });
			}
			if (image) {
				const fileStream = fs.createReadStream(image.path);

				const deleteparams = {
					Bucket: "ecommercenextnode",
					Key: `${updated.image.key}`,
				};
				s3.deleteObject(deleteparams, function (err, data) {
					if (err) console.log("S3 DELETE ERROR DUING UPDATE", err);
					else console.log("S3 DELETED DURING UPDATE", data); // deleted
				});
				const params = {
					Bucket: "ecommercenextnode",
					// Key: `category/${uuidv4()}/rizwan`,
					Key: `category/${uuidv4()}img ${image.name}`,
					Body: fileStream,
					ACL: "public-read",
					ContentType: image.type,
				};
				s3.upload(params, function (err, data) {
					if (err) {
						return res
							.status(400)
							.json({ error: `Upload to 3s3 failed ${err}` });
					}
					console.log("Aws uploadres data", data);
					updated.image.url = data.Location;
					updated.image.key = data.key;
					updated.postedBy = req.user._id;

					updated.save((err, success) => {
						if (err)
							return res.status(400).json({ error: `error saving DB  ${err}` });
						return res.json({ success: success });
					});
				});
			} else {
				res.json(updated);
			}
		});
	});
};

const remove = (req, res) => {
	const { slug } = req.params;

	CategoryModel.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: "Could not delete category",
			});
		}
		const deleteparams = {
			Bucket: "ecommercenextnode",
			Key: `${data.image.key}`,
		};
		s3.deleteObject(deleteparams, function (err, data) {
			if (err) console.log("S3 DELETE ERROR DUING UPDATE", err);
			else console.log("S3 DELETED DURING UPDATE", data); // deleted
		});
		res.json({
			message: "Category deleted successfully",
		});
	});
};

module.exports = {
	create,
	list,
	read,
	update,
	remove,
};
