const expressJwt = require('express-jwt');
const userModel = require("../models/userModel");
const AWS = require('aws-sdk');
const jwt=require("jsonwebtoken")
const {registerEmailParams}  = require('../helpers/email');
const shortid=require("shortid")
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES();
const  registeration=async(req,res)=>{
    
    const { name, email, password, categories } = req.body;
    userModel.findOne({email:email}).then((err,user)=>{
        if(user)
        return res.status(400).json({message:"email is taken"});
        // else
        // return res.status(200).json({message:"success"})

    }).catch(err=>console.log(err))
    // const user=await userModel.create({
    //     name:name,
    //     email:email,
    //     hashed_password:password,
    //     // "pic"
    // })
    // if(user)
    // {
    //     res.status(201).json({
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         })
    //     }
    // else{
    //     res.status(400);
    //     console.log("user not created")
    // }

    const token=jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{
        expiresIn:"10m"
    })
    console.log(token);
        const emaill=email
        const params = registerEmailParams(emaill,token);
        // const params = registerEmailParams(emaill,token);

        const sendEmailOnRegister = ses.sendEmail(params).promise();

        sendEmailOnRegister
            .then(data => {
                console.log('email submitted to SES', data);
                res.json({
                    message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
                });
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.status(422).json({
                    error: `We could not verify your email. Please try again`
                });
            });

}

const registerActivate=(req,res)=>{
    const {token}=req.body;
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                error: 'Expired link. Try again'
            });
        };
    })
        const { name, email, password } = jwt.decode(token);
        // to create unique username short id is used;
        const username = shortid.generate();
        userModel.findOne({email:email}).then((err,user)=>
        {
            if(user)
            {
                res.status(400).json({error:"email is taken"});
            }
            const collection=userModel.create(
                {
                    username:username,
                    name:name,
                    email:email,
                    hashed_password:password,
                }
                )
            if(collection)
            res.status(201).json({message:"Registeration Success Please Login"});
            else
            res.status(400).json({error: 'Error saving user in database. Try later'})

                
        })

    

}


const login=async (req,res)=>{
    try{
        
        const {email,password}=req.body;
        console.log(email,password);
        const user=await userModel.findOne({email})
        if(!user)
        {
            return res.status(400).json({error:"email not found"});
        }
        if(!await user.matchPassword(password))
        {
            return res.status(400).json({error:"Password not matched"});
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        const {_id,username,name,role}=user;
        res.json({token,user:{_id,username,name,email,role},message:"logged in successfully"});
    }
    catch(e){
        console.log(e)
        res.json({error:"e"});
    }

};
// const verifyToken=(req,res)=>{
//     let token;
//     token=req.headers.authorization.split(" ")[1];
//     const decode=jwt.verify(token,process.env.JWT_SECRET);
//     if(decode)
//     res.send("Tirr")
//     else
//     res.send("No")
// }

const verifyToken=expressJwt({
        secret: process.env.JWT_SECRET
    })

const authMiddleware=async(req,res,next)=>{
    const authId=req.user._id;
    await userModel.findOne({_id:authId}).then((user,err)=>{
        if(!user||err)
        {
            console.log("error",err);
            // console.log("user");  
        return res.status(400).json({error:"User not found"})}


        req.profile=user;
        // storing the user details in req.profile and sennding it to the next function

        next();
        
    })

}
const adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    userModel.findOne({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};
module.exports={registeration,registerActivate,login,verifyToken,authMiddleware,adminMiddleware};
