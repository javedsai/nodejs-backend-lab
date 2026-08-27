import express from "express"
const router = express.Router()
import Student from '../models/student.model.js'

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
router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body)
        res.status(201).json(newStudent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PUT - update student
router.put('/:id', async (req, res) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        if (!updateStudent) {
            return res.status(404).json({message: "Student Not Found"})
        }
        return res.json(updateStudent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE - remove student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) {
            return res.status(404).json({message: "Student Not Found"})
        }
        return res.json({message: "Student Deleted Successfully"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

export default router