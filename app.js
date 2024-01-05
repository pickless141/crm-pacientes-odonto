const express = require('express');
const cors = require('cors');
const mainRoutes = require('./routes/indexRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', mainRoutes)


module.exports = app;