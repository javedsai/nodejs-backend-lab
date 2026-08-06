import express from "express"
const app = express()
const router = express.Router()

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

const myThirdMiddleware = (req, res, next) => {
    console.log("My third middleware")
    next()
}

router.use(myThirdMiddleware)

// app.use(myMiddleware)

// app.get('/', myMiddleware, myOtherMiddleware, (req,res) => {
//     res.send("Home Page")
// })
router.get('/', myMiddleware, myOtherMiddleware, (req,res) => {
    res.send("Home Page")
})

// app.get('/about', (req, res) => {
//     res.send("About Us Page")
// })

router.get('/about', (req, res) => {
    res.send("About Us Page")
})

router.use((err, req, res, next) => {
    console.error(`Error is as follows: ${err.stack}`)
    res.status(500).send('Something has broke')
})

router.use((req, res) => {
    res.send("Error 404 not found")
})

app.use('/test', router)

app.listen(3000, ()=>{
    console.log("Server Started Successfully at Port 3000")
})
