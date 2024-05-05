const express = require("express");
const { linkCreateValidator } = require("../validators/link");
const { create, clickCount, popular } = require("../controllers/link");
const { runValidation } = require("../validators");
const { authMiddleware, verifyToken } = require("../controllers/auth");

const router = express.Router();

router.post(
	"/link",
	linkCreateValidator,
	verifyToken,
	runValidation,
	authMiddleware,
	create,
);

router.get("/linkcheck", (req, res) => {
	res.send("Category");
});
router.put("/click-count",clickCount)
router.get('/link/popular', popular);
router.get('/link/popular/:slug', popularInSingleCategory);
module.exports = router;
