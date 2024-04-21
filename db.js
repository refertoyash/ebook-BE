require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    // console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectToMongo;