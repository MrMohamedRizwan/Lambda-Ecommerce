const express=require("express");

const { runValidation } = require("../validators");
const { authMiddleware, verifyToken, adminMiddleware } = require("../controllers/auth");
const { read } = require("../controllers/user");
const router =express.Router();

router.get('/user',verifyToken,authMiddleware,read);
router.get('/admin',verifyToken,adminMiddleware,read);
router.get('/',(req,res)=>{
    res.send("User Route");
});

module.exports = router;  
