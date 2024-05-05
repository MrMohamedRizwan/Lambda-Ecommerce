const categoryModel = require("../models/category");
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

const clickCount = async (req, res) => {
	const { linkId } = req.body;
    linkModel.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } }, { upsert: true, new: true }).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: `Could not update view count ${err}`
            });
        }
        res.json(result);
    });
}
const popular=(req,res)=>{
	linkModel.find()
	.populate('postedBy', 'name')
	// to ort in decreasing order 
        .sort({ clicks: -1 })
        .limit(3)
        .exec((err, links) => {
            if (err) {
                return res.status(400).json({
                    error: 'Links not found'
                });
            }
            res.json(links);
        });
}


const popularInSingleCategory=(req,res)=>{
	const {slug}=req.params;
	categoryModel.find({slug}).exec((err,category)=>{
		if (err) {
            return res.status(400).json({
                error: 'Could not load categories'
            });
        }
		linkModel.find({categories:category})
		.sort({ clicks: -1 })
		.limit(3)
		.exec((err,links)=>{
			if (err) {
				return res.status(400).json({
					error: 'Links not found'
				});
			}
			res.json(links);
		})
	})

}
module.exports = { create,clickCount ,popular,popularInSingleCategory};
