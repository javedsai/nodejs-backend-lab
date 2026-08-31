import express from "express"
import studentRoutes from "./routes/students.routes.js"
import {connectDB} from "./config/database.js"
import multer from "multer"
import cors from "cors"
const app = express()

// Connect to MongoDB
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')//not required
app.use(express.static('public'))//not required
app.use(cors())

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
