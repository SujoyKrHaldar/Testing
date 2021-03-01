const chalk = require('chalk');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const error = chalk.inverse.red;
const success = chalk.inverse.green;

const staticpath = path.join(__dirname, "../public");
app.use(express.static(staticpath));
app.use('/CSS', express.static(path.join(__dirname, "../public/CSS")));
app.use('/JS', express.static(path.join(__dirname, "../public/JS")));
app.use('/Image', express.static(path.join(__dirname, "../public/Image")));
app.set("view engine", "hbs")

//------routing

app.get("/", (req,res)=>{
    res.render("index");
    console.log(success('home page response successful'));
})

app.get("/contact", (req,res)=>{
    res.render("contact");
    console.log(success('contact page response successful'));
})

//------server
app.listen(port, ()=>{
    console.log(success(`server running at ${port}`));
})