import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
const connection = await mongoose.connect(process.env.MONGODB_URL);
console.log(`Mongo DB connection is successfull on ${connection.connection.host}`)

    }
    catch(error){
        console.error('Mongo DB connection failed',error.message);
    }
    

}

export default connectDB;