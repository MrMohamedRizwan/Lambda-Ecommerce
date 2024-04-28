const express = require("express");
const { linkCreateValidator } = require("../validators/link");
const { create, clickCount } = require("../controllers/link");
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
module.exports = router;
