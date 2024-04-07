const CategoryModel=require('../models/category')
const slugify=require("slugify");


const create=(req,res)=>{
    const {name,content}=req.body;
    const slug=slugify(name);
    const image={
        'url':"https://placehold.co/200x150.png?text=localhost",
        'key':"123"
    }
    const category=new CategoryModel({name,image:image,content,slug});
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:"Category not created"
            })
        }
        res.json(data);
    })

}

const list=(req,res)=>{

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