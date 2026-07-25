const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/contacts_crud')
        .then(() => {console.log("Database connected")})

const Contact = require('./models/contact.model')




app.listen(3000, () => {
    console.log("Server is running at Port 3000")
})

//Middleware
app.set('view engine', 'ejs')
app.use(express.json())
//Parse incoming url payloads
app.use(express.urlencoded({extended:true}))
//configure public static resource assets
app.use(express.static('public'))

//Routes
app.get('/', async (req, res) => {
    const contacts = await Contact.find()
    // res.send(contacts)
    res.render('home', {contacts})
})

app.get('/show-contact/:id', async (req, res) => {
    // const contact = await Contact.findOne({_id: req.params.id})
    const contact = await Contact.findById(req.params.id)
    res.render('show-contact', {contact})
})

app.get('/add-contact', (req, res) => {
    res.render('add-contact')
})

app.post('/add-contact', async (req, res) => {
    await Contact.create(req.body)
    res.redirect('/')
})

app.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    res.render('update-contact', {contact})
})

app.post('/update-contact/:id', async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body)
    // console.log(req.params)
    // console.log(req.body)
    res.redirect("/")

})

app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
