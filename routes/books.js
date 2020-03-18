const express = require("express");
const app = express();
const Book = require("../models/Book");
const Author = require("../models/Author");

app.get("/", (req, res, next)=> {
    Book
        .find("asdfsdaf")
        .populate("author") // this is new
        .then((books)=> {
            res.render("book/books.hbs", {booksHbs: books});
        })
        .catch((err)=> {
            next("database error");
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

app.post("/create", (req, res, next)=> {
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
        .catch((err)=> {
            next(err.message);
        })
})

module.exports = app;