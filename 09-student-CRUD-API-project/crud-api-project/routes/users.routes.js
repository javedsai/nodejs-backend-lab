import express from "express"
const router = express.Router()
import User from "../models/users.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"


router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body
        const existingUser = await User.findOne({
            $or: [
                {username: username},
                {email: email}
            ]
        })

        if (existingUser) {
            return res.status(400).json("Username or Email Already Exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        })

        await newUser.save()
        res.json(newUser)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
    
})

router.post('/login', async (req, res) => {
    try {
        /* - search in db by username
        - if not found then, Username not found
        - Else search in db by password after decrypt
        - If not match then, Invalid Password
        - Else store in session, here we'll store in JWT
        */
       const {username, password} = req.body
       const user = await User.findOne({username: username})
        if (!user) {
            return res.status(404).json({message: "Username Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({message: "Invalid Credentials"})
        }

        //store username and email in session/jwt
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({
            token: token,
            user: {
                id: user._id,
                username: user.username
            }
        })

    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

router.post('/logout', (req, res) => {
    res.json({mesage: "Logout Successfully"})
})

export default router