import express from "express"
const app = express()
import {body, validationResult} from "express-validator"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

//Validation Rule
const validateUser = [
    body("userName")
        .notEmpty()
        .withMessage("User Name is required")
        .isLength({
            min: 3
        })
        .withMessage("User Name must be atleast 3 chars long")
        .isLength({
            max:10
        })
        .withMessage("User Name must not exceed 10")
        .trim()
        .isAlpha()
        .withMessage("User Name must contain Letter")
        .custom((value) => {
            if (value == "admin") {
                throw new Error("Username Admin is Not Allowed")
            }
            return true
        })
        .customSanitizer((value) => {
            return value.toLowerCase()
        }),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be blank")
        .isEmail()
        .withMessage("Invalid Email Address")
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be blank")
        // .isStrongPassword()
        .withMessage("Password is not strong"),
    body("age")
        .notEmpty()
        .withMessage("Age cannot be blank")
        .isInt({
            min:18
        })
        .withMessage("Age should be atleast 18 years"),
    body("city")
        .notEmpty()
        .withMessage("City is required")
        .isIn([
            "mumbai",
            "pune",
            "delhi",
            "bangalore"
        ])
        .withMessage("Please Select Valid City")
]

app.get("/", (req, res) => {
    res.render("home", {errors: []})
})

app.post("/save-form", validateUser, (req, res) => {
const error = validationResult(req)
  if(error.isEmpty()){
    return res.send(req.body);
  }

  return res.render("home", {errors: error.array() })
})

app.listen(3000, ()=>{
    console.log("Application is running at port 3000")
})