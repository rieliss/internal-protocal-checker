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

// const express = require('express')
// const path = require('path')
// const IP = require('ip')

// const Datenow = Date()

// const app = express()
// app.set('view engine' , 'ejs')  // ใช้ ejs เป็น templete  engine
// app.set('page' ,path.join(__dirname + ''));
// app.use('/' , (req,res,next)=>{
//         res.render('page.ejs')

//         console.dir(req.socket.remoteAddress)
//         console.dir(Datenow)
//         next()

// })

// // app.get('/' , (req,res)=>{
// //         console.dir(req.socket.remoteAddress)
// //         console.dir(Datenow)
// // })
// // app.get('/admin' , (req,res)=>{
// //         res.render('page/page.ejs')
// // })

// app.listen(440,'0.0.0.0'  , ()=>{
//     console.log('Start port in 440')
// })
