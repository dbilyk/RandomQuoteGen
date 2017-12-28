const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const pug = require("pug");
const sass = require("node-sass-middleware");
const fs = require("fs");

app.set("views","/pug");
app.set("view engine", "pug");
app.use(
  sass({
    src : path.join(__dirname, "sass"),
    dest : path.join(__dirname,"public"),
    debug : true,
    outputStyle : "compressed",
        
  }))
  
app.use("/public",express.static(path.join(__dirname,"public")));

app.get("/", (req,res)=>{
  var index = pug.renderFile("./pug/index.pug");
  res.send(index);
})

server.listen(3000, "localhost",()=>{console.log("up and running on 3000")});