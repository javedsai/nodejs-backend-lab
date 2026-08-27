import mongoose from "mongoose"
// import dotenv from "dotenv"
// dotenv.config()
import "dotenv/config"

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))
}