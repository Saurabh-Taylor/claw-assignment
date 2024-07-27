import mongoose from "mongoose";

export const connectToDb = async(req,res)=>{
    try {   
        const connection  = await mongoose.connect(String(process.env.MONGODB_URI))
        console.log(`Db is connected ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDb connection error::" , error)
        process.exit(1)
    }
}