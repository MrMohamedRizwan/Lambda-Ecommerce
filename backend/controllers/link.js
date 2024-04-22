const linkModel = require("../models/linkModel");

const create = async (req, res) => {
	const { title, url, categories, medium, type } = req.body;
	const slug = url;
	let link = new linkModel({ title, url, categories, medium, type, slug });
	link.postedBy = req.user._id;
	// console.log(categories);
	let arraofCategories =  categories 
	link.categories = arraofCategories;
	await link.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: `Link already exists ${err}`,
			});
		}
		res.json(data);
	});
};
module.exports = { create };
