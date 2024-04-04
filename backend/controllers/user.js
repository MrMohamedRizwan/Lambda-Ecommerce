const read=(req,res)=>{

        req.profile.hashed_password=undefined;
        // req.profile.salt=undefined; salt is not used
        res.json(req.profile);
        // return res.json(req.profile);
}
module.exports={read}