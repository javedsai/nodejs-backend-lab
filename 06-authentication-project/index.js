import express from "express"
const app = express()
import session from "express-session"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import User from "./model/user.model.js"

//mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
    .then(() => console.log('Database Connected!'))
    .catch((err) => console.log(err))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))//not require for now
//Session Middleware
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //24hrs 
    }
}))

//custom middleware: protects routes that require login
function checkLogin(req, res, next) {
    if (req.session.username) {
        next()
    } else {
        res.redirect('/login')
    }
}

//Routes
app.get('/', checkLogin, (req, res) => {
    const username = req.session.username
    res.render('home', {username: username})
})

app.get('/login', (req, res) => {
    res.render('login', {errors: ''})
})

app.get('/register', (req, res) => {
    res.render('register', {errors: ''})
})

app.post('/register', async(req, res) => {
    const {username, password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    // res.send({username, password: hashPassword})
    await User.create({
        username:username,
        password: hashPassword
    })
    res.redirect('/login')
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    // console.log(user)
    // res.send(user)
    if (!user) {
        return res.render('login', {errors: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        return res.render('login', {errors: 'Invalid Login'})
    }

    req.session.username = username
    res.redirect('/')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

app.listen(3000, () => {
    console.log("App is running at Port 3000")
})