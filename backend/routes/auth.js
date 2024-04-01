const express=require("express");

const {registeration, registerActivate, login} = require("../controllers/auth");
const { userRegisterValidator, userLoginValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
const router =express.Router();

router.post('/register',userRegisterValidator,runValidation,registeration)
router.post('/register/activate',registerActivate);
router.post('/login',login);
// userLoginValidator,runValidation,
module.exports = router;  
