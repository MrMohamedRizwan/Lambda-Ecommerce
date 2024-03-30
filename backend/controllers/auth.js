const userModel = require("../models/userModel");
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const registerEmailParams = (email) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <html>
                            <h1>Vefiry your email address</h1>
                            <p>Please use the following link to complete your registration:</p>
                            <p>/auth/activate/</p>
                        </html>
                    `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    };
};
const ses = new AWS.SES();
const  registeration=async(req,res)=>{
    
    const { name, email, password, categories } = req.body;
    const user=await userModel.create({
        name:name,
        email:email,
        hashed_password:password,
        // "pic"
    })
    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            })
        }
        else{
            res.status(400);
            console.log("user not created")
        }
        const emaill="mrrizwan2sdfg207@gmail.com"
        const params = registerEmailParams(emaill);

        const sendEmailOnRegister = ses.sendEmail(params).promise();

        sendEmailOnRegister
            .then(data => {
                console.log('email submitted to SES', data);
                // res.json({
                //     message: `Email has been sent to ${email}, Follow the instructions to complete your registration`
                // });
            })
            .catch(error => {
                console.log('ses email on register', error);
                // res.json({
                //     message: `We could not verify your email. Please try again`
                // });
            });

}
module.exports={registeration};