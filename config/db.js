require("dotenv").config();
const mongoose = require("mongoose");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}.atpfcoi.mongodb.net/`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;