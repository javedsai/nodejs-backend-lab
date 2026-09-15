import express from "express"
import studentRoutes from "./routes/students.routes.js"
import userRoutes from "./routes/users.routes.js"
import {connectDB} from "./config/database.js"
import {auth} from "./middleware/auth.js"
import multer from "multer"
import cors from "cors"
import path from "path"
import ratelimit from "express-rate-limit"
import helmet from "helmet"
const app = express()
const __dirname = import.meta.dirname;

// Connect to MongoDB
connectDB()

//Rate Limit Configuration
const limiter = ratelimit({
    windowMs: 1000 * 60, //1 min
    max: 5, //only 5 requests allowed per IP within the window (for testing)
    message: 'Too many requests from this IP. Please try again later.' 
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')//not required
// app.use(express.static(path.join(__dirname, 'uploads')))//not required
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
//Middleware for Rate Limit
app.use(limiter)
//Middleware for Hemet
app.use(helmet())
// Mount Auth API routes under /api/auth
app.use('/api/users', userRoutes)
// Added auth middleware before student routes
app.use(auth)
// Mount student API routes under /api/students
app.use('/api/students', studentRoutes)


// --- Error-handling middleware for multer + general errors ---
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({message: err.message, code: err.code})
    } else {
        res.status(500).json({message: 'Something Went Wrong', error: err.message})
    }
    next()
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
