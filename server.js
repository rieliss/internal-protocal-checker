const express = require("express");
const connectDB = require("./connect/config");
const path = require("path");
const app = express();
const port = 440;
const morgan = require("morgan");
const database = require("./model/database");
const cors = require("cors");

connectDB();

app.use(cors());
app.get("/", async (req, res) => {
  try {
    let ip = req.socket.remoteAddress;
    console.dir(ip);
    res.sendFile("index.html", { root: path.join(__dirname) });
    await database({ IP: ip }).save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin", async (req, res) => {
  try {
    const showip = await database.find({}).exec();
    res.send(showip);
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin-page", (req, res) => {
  res.sendFile("admin.html", { root: path.join(__dirname) });
});

app.delete("/delete", async (req, res) => {
  try {
    await database.deleteMany({});
    console.log("Deleted!");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Start server at port ${port}`);
});
