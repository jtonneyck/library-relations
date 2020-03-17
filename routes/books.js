const express = require("express");
const app = express();
const Book = require("../models/Book");
const Author = require("../models/Author");

app.get("/", (req, res)=> {
    Book
        .find()
        .populate("author") // this is new
        .then((books)=> {
            res.render("book/books.hbs", {booksHbs: books});
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get("/create", (req, res)=> {
    Author
        .find()
        .then((authors)=> {
            res.render("book/create.hbs", {authorsHbs: authors});
        })
        .catch((err)=> {
            res.send("error");
        })
})

app.post("/create", (req, res)=> {
    Book
        .create({
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            image_url: req.body.image_url,
            author: req.body.author 
        })
        .then((book)=> {
            res.send("ok");
        })
})

module.exports = app;