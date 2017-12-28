const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const pug = require("pug");
const sass = require("node-sass-middleware");

//setting up pug middleware
app.set("views","/pug");
app.set("view engine", "pug");

//this is how to add sass middleware compilation.  
//if the html css link is "/style.css", it will look for scss file in src, and output it to dest as css.
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