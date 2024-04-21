const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://refertoyash:FRCOLVffaFvMog48@cluster0.ytsp98x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo");
  });
};

module.exports = connectToMongo;
