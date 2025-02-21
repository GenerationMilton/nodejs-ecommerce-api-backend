import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        //to connect database with string url

        const connected = await mongoose.connect(process.env.MONGO_URL);
        
        mongoose.set("strictQuery",false);
        console.log(`Mongodb connected ${connected.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
};

export default dbConnect;
