import express from "express"
import cookieParser from "cookie-parser"
import csurf from "csurf"
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cookieParser())
const csrfProtection = csurf({cookie:true})


//Routes
app.get('/', (req, res) => {
    res.send("Welcome to Home Page")
})

app.get('/myform', csrfProtection, (req, res) => {
    res.render('myform', {errors: [], csrfToken: req.csrfToken()})
})

app.post('/submit', csrfProtection, (req, res) => {
    res.send(req.body)
})

app.listen(3000, () => {
    console.log("App is running at port 3000")
})
