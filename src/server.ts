import { Server } from 'http';
import app from "../src/app"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// 
let server:Server;

const port = 5000;


const mongoUri = process.env.MONGO_URI;

// 
async function main() {
    if (!mongoUri) {
        throw new Error("MONGO_URI environment variable is not defined.");
    }
    await mongoose.connect(mongoUri);
    // 
    try{
        server=  app.listen(port,()=>{
            console.log(`App us running listing on port ${port}`);
        })  
    }
    catch(err){
        console.log(err);
    }
}
main();