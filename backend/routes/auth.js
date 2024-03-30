const express=require("express");

const {registeration} = require("../controllers/auth");
const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
const router =express.Router();

router.post('/register',userRegisterValidator,runValidation,registeration)

module.exports = router;  
