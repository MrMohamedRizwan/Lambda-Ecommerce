const CategoryModel=require('../models/category')
const slugify=require("slugify");
const formidable=require("formidable");
const uuidv4=require("uuid/v4");
const AWS=require("aws-sdk");


// AWS S3
const s3=new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
})

const create=(req,res)=>{
    // const {name,content}=req.body;
    // const slug=slugify(name);
    // const image={
    //     'url':"https://placehold.co/200x150.png?text=localhost",
    //     'key':"123"
    // }
    // const category=new CategoryModel({name,image:image,content,slug});
    // category.save((err,data)=>{
    //     if(err){
    //         return res.status(400).json({
    //             error:"Category not created"
    //         })
    //     }
    //     res.json(data);
    // })

    let form =new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if(err)
        {
            return res.status(400).json({error:"Image could not be uploaded"});
        }
        const {name,content}=fields;
        const {image}=files;
        const slug=slugify(name);
        // upload to s3

        let category=new CategoryModel({name,content,slug});
        if(image.size>2000000)
        {
            return res.status(400).json({error:"Reduce the size of the image"});
        }
        const  params={
            Bucket:"ecommercenextnode",
            Key:`category/${uuidv4()}`,
            Body:image.path,
            ACL:'public-read',
            ContenType:'image/jpg'
        }
        
        s3.upload(params,function(err,data){
            if(err)
            {
                return res.status(400).json({error:`Upload to 3s3 failed ${err}`});
            }
            console.log("Aws uploadres data",data);
            category.image.url=data.Location
            category.image.key=data.key
            category.postedBy = req.user._id;


            category.save((err,success)=>{
                if(err)
                return res.status(400).json({error:"error saving DB"});
                return res.json({success:success})

            })
        })


    })
    // res.send("category");

}

const list=(req,res)=>{
    CategoryModel.find({}).exec((err,data)=>{
        if(err)
        {
            return res.status(400).json({error:"Category not found"});
        }
        res.json(data);
    })
}

const read=(req,res)=>{

}

const update=(req,res)=>{

}

const remove=(req,res)=>{

}

module.exports={
    create,
    list,
    read,
    update,
    remove
}