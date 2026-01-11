const mongoose=require('mongoose');

const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.log('MongoDB connection failed:',err.message);
        
    }};
module.exports=ConnectDB;
    