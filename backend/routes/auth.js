const express=require("express");

const {registeration, registerActivate, login, verifyToken} = require("../controllers/auth");
const { userRegisterValidator, userLoginValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
const router =express.Router();

router.post('/register',userRegisterValidator,runValidation,registeration)
router.post('/register/activate',registerActivate);
router.post('/login',userLoginValidator,runValidation,login);
// userLoginValidator,runValidation,
// router.get('/secret',verifyToken,(req,res)=>{
//     res.send("This can be accesed if token is present");
// })
module.exports = router;  
