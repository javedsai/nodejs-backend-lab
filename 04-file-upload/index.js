import express from "express"
const app = express()
import multer from "multer"
import path from "path"

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //generate new file name
        const newFilename = Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }
})

const limits = {
    fileSize: 3 * 1024 * 1024 //3 MB
}

//for single fileFilter check
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true)
//     } else {
//         cb(new Error("Only Images are allowed"), false)
//     }
// }

//for multiple fileFilter check
const fileFilter = (req, file, cb) => {
    if (file.fieldname == "userFile") {
        if (file.mimetype =='image/jpeg'  || file.mimetype == 'image/png') {
            cb(null, true)
        } else {
            cb(new Error("Only Images are allowed"), false)
        }
    } else if (file.fieldname == "userDocuments"){
        if (file.mimetype == 'application/pdf') {
            cb(null, true)
        } else {
            cb(new Error("Only PDF are allowed for documents"), false)
        }
    } else {
        cb(new Error("Unknown Field"), false)
    }    
}

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
})

//Routes
app.get('/', (req, res) => {
    res.render('home', {errors: []})
})

//for single file
// app.post('/save-form', upload.single('userFile'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send("No Files Uploaded")
//     }
//     return res.send(req.file)
// })

//for multiple files
// app.post('/save-form', upload.array('userFile', 3), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).send("No Files Uploaded")
//     }
//     return res.send(req.files)
// })

//for multipe fields to upload files
app.post('/save-form', upload.fields([
    {name: 'userFile', maxCount: 1},
    {name: 'userDocuments', maxCount: 3}
]), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No Files Uploaded")
    }
    return res.send(req.files)
})

app.listen(3000, () => {
    console.log("Application is running at port 3000")
})

