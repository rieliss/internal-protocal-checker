const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khessarin:XR4kMycHW6XUSvC3@cluster0.ptgx8po.mongodb.net/",
      { useNewUrlParser: true }
    );
    console.log("Database Connected!");
  } catch (err) {
    console.log("Connection failed!");
  }
};

module.exports = connectDB;
