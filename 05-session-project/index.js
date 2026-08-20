import express from "express"
import session from "express-session"
import MongoStore from "connect-mongo"
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')//not require
app.use(express.static('public'))//not require
//session middleware
app.use(session({
    secret : 'my secret key',
    resave : false,
    saveUninitialized : false,
    cookie : { 
        maxAge: 1000 * 60 * 60 * 24 //24 hrs
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessionDB'
    })
}))

//Routes
app.get('/', (req, res) => {
    if (req.session.username) {
        return res.send(`Welcome ${req.session.username} to the home page`)
    }else {
        return res.send(`Welcome Guest to the home page`)
    }
})

app.get('/about', (req, res) => {
    res.send(req.session)
    // if (req.session.username) {
    //     return res.send(`${req.session.username} you are on About Us Page and u have selected: ${req.session.cart}`)
    // }else {
    //     return res.send("Guest you are on About Us Page")
    // }
})

app.get('/set-session', (req, res) => {
    req.session.username = "Javed Sai"
    req.session.cart = "Mobile"
    res.send("Username has been set in session")
})

app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Username for the session is: ${req.session.username}`)
    }else {
        res.send("Username not found in the session")
    }
})

app.get('/delete-only-cart', (req, res) => {
    // res.send(req.session)
    console.log(`Initial session value: ${req.session.cart}`)
    if (req.session.cart) {
        console.log(`Before Delete: ${req.session.cart}`)
        delete req.session.cart
        console.log(`After Delete: ${req.session.cart}`)
        return res.send("Cart Deleted Successfully")
    } else {
        console.log(`In Else: ${req.session.cart}`)
        return res.send("Cart is empty")
    }
})

app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if (err){
            return res.status(500).send(`Failed to desroy session: ${err}`)
        } else {
            return res.send("Session destroyed successfully!")
        }
    })
})

app.listen(3000, () => {
    console.log("App is running at port 3000")
})