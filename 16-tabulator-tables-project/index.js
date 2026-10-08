import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import {User} from './model/users.model.js';
const app = express();

//Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.log(err))

app.use(cors());
//Common Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Common Routes
app.get('/', (req, res) => {
    res.send('welcome to homepage for datatables');
});

app.get('/users', async (req, res) =>{
    const getUsers = await User.find();
    return res.json({data: getUsers});
});

const port = process.env.PORT;
//Start Server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});