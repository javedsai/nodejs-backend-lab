import express from "express"
import studentRoutes from "./routes/students.routes.js"
import {connectDB} from "./config/database.js"
const app = express()

// Connect to MongoDB
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')//not required
app.use(express.static('public'))//not required

// Mount student API routes under /api/students
app.use('/api/students', studentRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
