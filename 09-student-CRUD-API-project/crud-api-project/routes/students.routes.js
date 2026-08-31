import express from "express"
const router = express.Router()
import Student from '../models/student.model.js'
import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //generate new filename
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const limits = {
    fileSize: 1024 * 1024 * 3 //3Mb
}

//for single fileFilter check
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error("Only Images are allowed"), false)
    }
}

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
})

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET single student by ID
router.get('/:id', async (req, res) => {
    try{
        const student = await Student.findById(req.params.id)
        if (!student) {
            return res.status(404).json({message: "Student Not Found"})
        }
        return res.json(student)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// POST - create new student
router.post('/', upload.single('profile_pic'), async (req, res) => {
    try {
        // const newStudent = await Student.create(req.body)
        const student = new Student(req.body)
        if (req.file) {
            student.profile_pic = req.file.filename
        }
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PUT - update student
router.put('/:id', upload.single('profile_pic'), async (req, res) => {
    try {
        const existingStudent = await Student.findById(req.params.id);
        if (!existingStudent) {
            if (req.file) {
                const filePath = path.join('uploads', req.file.filename )
                fs.unlink(filePath, (err)=>{
                    if (err) {
                        console.log(err)
                    }
                })
            }    
            return res.status(404).json({message:'Student Not Found'})
        }
        if (req.file) {
            //remove existing image if exist
            if (existingStudent.profile_pic) {
                const oldImagePath = path.join('uploads', existingStudent.profile_pic)
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.log('Failed to Delete Old Image', err)
                    }
                })
            }            
            req.body.profile_pic = req.file.filename
        }

        const updateStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )        
        return res.json(updateStudent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE - remove student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)
        if (!deletedStudent) {
            return res.status(404).json({message: "Student Not Found"})
        }

        if (deletedStudent.profile_pic) {
            const oldImagePath = path.join('uploads', deletedStudent.profile_pic)
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.log('Failed to Delete Old Image', err)
                }
            })
        }

        return res.json({message: "Student Deleted Successfully"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

export default router