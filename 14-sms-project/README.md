# SMS Project using Twilio

A simple Node.js and Express.js project demonstrating how to integrate the Twilio Messaging API to send SMS messages.

## Features

- Send SMS using the Twilio Node.js SDK
- Express.js backend integration
- EJS form for submitting SMS details
- Twilio Messaging API integration
- Environment variables for Twilio credentials
- Error handling for SMS requests
- Tested with a real SMS using a Twilio trial account

## Technologies Used

- Node.js
- Express.js
- EJS
- Twilio
- dotenv
- Nodemon

## Environment Variables

Create a `.env` file in the project root:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> **Security:** Never commit the `.env` file or expose sensitive credentials such as your Twilio Auth Token.

## Twilio Trial Limitation

This project was implemented and tested using a Twilio trial account.

The current Twilio SMS trial requires the message body to use one of Twilio's predefined templates. Therefore, the implementation uses a template such as:

```js
body: 'sms_appointment_reminders'
```

instead of a dynamic message such as:

```js
body: req.body.message
```

This is a limitation of the Twilio trial environment rather than an Express.js or Twilio SDK limitation.

After upgrading to a fully featured Twilio account, custom SMS body content can be used, subject to Twilio's messaging requirements and applicable country/carrier regulations.

## SMS Flow

```text
User / Express Request
        ↓
Express.js Backend
        ↓
Twilio Node.js SDK
        ↓
Twilio Messaging API
        ↓
Twilio Phone Number
        ↓
Recipient Mobile Number
        ↓
SMS
```

## Learning Objective

The purpose of this project is to understand how a Node.js/Express.js application integrates with an external SMS service using the Twilio SDK and Messaging API.