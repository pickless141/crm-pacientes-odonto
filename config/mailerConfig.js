const nodemailer = require('nodemailer');
const {GMAIL_USER, GMAIL_PASS} = process.env

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

module.exports = transporter;