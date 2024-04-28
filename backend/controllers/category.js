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
	// {// const {name,content}=req.body;
	// const slug=slugify(name);
	// const image={
	//     'url':"https://placehold.co/200x150.png?text=localhost",
	//     'key':"123"
	// }
	// const category=new CategoryModel({name,image:image,content,slug});
	// category.save((err,data)=>{
	//     if(err){
	//         return res.status(400).json({
	//             error:"Category not created"
	//         })
	//     }
	//     res.json(data);
	// })}

	let form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Image could not be uploaded error in parsing" });
		}
		const { name, content } = fields;
		const { image } = files;
		const slug = slugify(name);
		// const fileStream = fs.createReadStream(image.path);
		// console.log("consoled image ",colors.magenta( image));
		// upload to s3

		let category = new CategoryModel({ name, content, slug });
		if (image.size > 200000000) {
			return res.status(400).json({ error: "Reduce the size of the image" });
		}
		const fileStream = fs.createReadStream(image.path);

		const params = {
			Bucket: "ecommercenextnode",
			// Key: `category/${uuidv4()}/rizwan`,
			Key: `category/${uuidv4()}img ${image.name}`,
			Body: fileStream,
			ACL: "public-read",
			ContenType: image.type,
		};

		s3.upload(params, function (err, data) {
			if (err) {
				return res.status(400).json({ error: `Upload to 3s3 failed ${err}` });
			}
			console.log("Aws uploadres data", data);
			category.image.url = data.Location;
			category.image.key = data.key;
			category.postedBy = req.user._id;

			category.save((err, success) => {
				if (err)
					return res.status(400).json({ error: `error saving DB  ${err}` });
				return res.json({ success: success });
			});
		});
	});
	// res.send("category");
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

const update = (req, res) => {};

const remove = (req, res) => {};

module.exports = {
	create,
	list,
	read,
	update,
	remove,
};
