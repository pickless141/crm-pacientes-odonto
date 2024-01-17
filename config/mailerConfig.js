const nodemailer = require('nodemailer');
const {GMAIL_USER, GMAIL_PASS, GMAIL_HOST} = process.env

const transporter = nodemailer.createTransport({
  host: GMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

module.exports = transporter;