const express = require('express');
const { categoryCreateValidator } = require('../validators/category');
const { runValidation } = require('../validators');
const { verifyToken, authMiddleware } = require('../controllers/auth');
const { create, list, read } = require('../controllers/category');
const router = express.Router();

router.post('/category',
// categoryCreateValidator,runValidation,verifyToken,authMiddleware,
create )
router.get('/categories', list);
router.post('/category/:slug', read);



router.get("/cat",(req,res)=>{
    res.send("Category")
})
module.exports = router;