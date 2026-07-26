import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
export const connectDb = () => { 
                mongoose.connect(process.env.MONGODB_URL)
                .then(() => {console.log("Database connected")})
                .catch((err) => console.log(err))
        }
