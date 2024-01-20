//const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mainRoutes = require('./routes/indexRoutes')

const app = express();

const allowedOrigin = process.env.FRONTEND_URL

app.use(
    cors({
      origin: allowedOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', mainRoutes)

//Genera clave secreta para jwt
//const jwtSecret = crypto.randomBytes(32).toString('hex');
//console.log(jwtSecret);

module.exports = app;