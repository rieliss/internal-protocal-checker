const mongoose = require("mongoose");

const database = mongoose.Schema(
  {
    IP: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("database", database);
