const mongoose = require("mongoose");

const URI =
  "mongodb+srv://admin:<password>@cluster0-cxikv.gcp.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connection.....!");
};

module.exports = connectDB;
