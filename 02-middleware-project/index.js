import express from "express"
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const myMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    const date = new Date()
    console.log(`Date is ${date.getDate()} and Month is ${date.getMonth()}`)
    next()
}

const myOtherMiddleware = (req, res, next) => {
    console.log("My other middleware")   
    next() 
}

// app.use(myMiddleware)

app.get('/', myMiddleware, myOtherMiddleware, (req,res) => {
    res.send("Home Page")
})

app.get('/about', (req, res) => {
    res.send("About Us Page")
})

app.listen(3000, ()=>{
    console.log("Server Started Successfully at Port 3000")
})
