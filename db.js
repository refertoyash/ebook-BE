require("dotenv");
const mongoose = require("mongoose");

require('dotenv').config();
const mongoURI = process.env.MONGOURI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo");
  });
};

module.exports = connectToMongo;
