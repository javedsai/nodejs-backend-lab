import express from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import path from "path";
const __dirname = import.meta.dirname;
const app = express();

//Common Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Email Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

//Routes
app.get('/', (req, res) => {
    res.render('mailpage', {errors: 0});
});

app.post('/send-email', async (req, res) => {
    try {
        const {to, subject, message} = req.body;
        const info = await transporter.sendMail({
            from: '"Javed Sai" <process.env.EMAIL_USER>',
            to: to,
            subject: subject,
            text: message,
            attachments: [
                {
                    filename: 'data.pdf',
                    path: path.join(__dirname, 'files', 'data.pdf')
                }
            ]
        });
        res.json({
            message: 'Email sent successfully',
            info: info
        })
    } catch(error){
        res.status(500).json({
            message: 'Failed to send email',
            error: error
        });
    }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running at port ${port}`));