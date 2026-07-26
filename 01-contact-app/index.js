import express from "express"
const app = express()
import contactRoutes from "./routes/contact.routes.js"
import {connectDb} from "./config/database.js"
connectDb()

app.listen(process.env.PORT, () => {
    console.log("Server is running at Port 3000")
})

//Middleware
app.set('view engine', 'ejs')
app.use(express.json())
//Parse incoming url payloads
app.use(express.urlencoded({extended:true}))
//configure public static resource assets
app.use(express.static('public'))

//Use Routes
app.use(contactRoutes)