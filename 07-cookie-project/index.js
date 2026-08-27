import express from "express"
import cookieParser from "cookie-parser"
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
//cokies middleware
// app.use(cookieParser())
app.use(cookieParser('my-secret-key123'))//signed cookie

//Routes
app.get('/', (req, res) => {
    const home = "Home Page"
    // const username = req.cookies.username
    const username = req.signedCookies.username
    if (username) {
        return res.send(`${home}: Cookie Found: ${username}`)
    } else {
        return res.send(`${home}: Cookie Not Found`)
    }
})

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'signed-javed', {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        signed: true
    })
    res.send('Cookie has been set')
})

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username')
    res.send('Cookie has been deleted')
})

app.listen(3000, () => {
    console.log("App is running at Port 3000")
})
