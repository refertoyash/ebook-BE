require("dotenv");
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(MONGOURI, () => {
    console.log("Connected to Mongo");
  });
};

module.exports = connectToMongo;
