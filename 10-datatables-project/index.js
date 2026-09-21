import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {User} from "./model/users.model.js";
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/users_demo')
    .then(()=>{
    console.log("Database Connected");    
})
    .catch((err)=>{
    console.log(err)
})

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view_engine', 'ejs')//not reqd only for practise
app.use(cors())

//Routes
app.get('/users', async (req, res) => {
    // console.log("Database:", mongoose.connection.name);
    // console.log("Collection:", User.collection.name);
    const getUsers = await User.find();
    return res.json({data: getUsers});
    
});


app.listen(3000, ()=>{
    console.log("Server is running at port 3000")
})