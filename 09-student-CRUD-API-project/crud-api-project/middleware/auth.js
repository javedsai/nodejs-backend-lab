import jwt from "jsonwebtoken"
import User from "../models/users.model.js"
import "dotenv/config"

export const auth = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(user)
            req.user = user
            next()            
        } else {
            res.status(401).json({message: "No Token Provided"})
        }
    } catch(err) {
        res.status(403).json({message: "Invalid and Expired Token"})
    }
}