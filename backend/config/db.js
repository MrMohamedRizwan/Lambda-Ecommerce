const mongoose = require('mongoose');
const connect_to_db=async()=>{
    await mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

module.exports = connect_to_db;




const connectToDB = async () => {
    try{
    const conn=await mongoose.connect (process.env.MONGO_URI,{    //127.07
    useNewUrlParser : true,useUnifiedTopology :true,
});
    console.log("MongoDB Connected");
}
    catch(e){
        console.log(e);
        process.exit(); //exit with failure
    }
}
// module.exports = connectToDB ;