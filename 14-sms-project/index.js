import express from 'express';
import 'dotenv/config';
import twilio from 'twilio';
const app = express();

//common middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Twilio Configurations
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

//Routes
app.get('/', (req, res) => {
    res.render('smspage', {errors: 0});
});

app.post('/send-sms', async (req, res) => {
    try{
        const {to, message} = req.body;
        const result = await client.messages.create({
            // body: message,
            // body: 'sms_appointment_reminders',
            body: 'sms_order_confirmation',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });

        return res.status(200).json({
            sid: result.sid,
            message: 'SMS sent successfully'
        });
    } catch(error){
        return res.status(500).json({
            message: 'Failed to send sms',
            error: error.message
        });
    }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running at port ${port}`));

