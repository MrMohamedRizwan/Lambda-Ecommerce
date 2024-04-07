const express=require("express");

const {registeration, registerActivate, login, verifyToken, forgotPassword, resetPassword} = require("../controllers/auth");
const { userRegisterValidator, userLoginValidator, Forgotpassvalidator, resetPasswordValidator,  } = require("../validators/auth");
const { runValidation } = require("../validators");
const router =express.Router();

router.post('/register',userRegisterValidator,runValidation,registeration)
router.post('/register/activate',registerActivate);
router.post('/login',userLoginValidator,runValidation,login);
router.put('/forgot-password',Forgotpassvalidator,runValidation,forgotPassword);
router.put('/reset-password',resetPasswordValidator,runValidation,resetPassword);

// userLoginValidator,runValidation,
// router.get('/secret',verifyToken,(req,res)=>{
//     res.send("This can be accesed if token is present");
// })
module.exports = router;  
