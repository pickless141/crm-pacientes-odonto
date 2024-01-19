//const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mainRoutes = require('./routes/indexRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', mainRoutes)

//Genera clave secreta para jwt
//const jwtSecret = crypto.randomBytes(32).toString('hex');
//console.log(jwtSecret);

module.exports = app;