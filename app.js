const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author")
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');    

app.set("view engine", "hbs");
mongoose.connect("mongodb://localhost/library", { 
        useNewUrlParser: true,  
        useUnifiedTopology: true 
    })
    .then((connection)=> {
        console.log("connected to mongodb")
    })
    .catch(err=> {
        console.log("not connected to mongodb:", err);
    })

app.use("/books", require("./routes/books"));

app.listen(3000, ()=> {
    console.log("Express is listening on", 3000);
})