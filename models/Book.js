const mongoose = require("mongoose");

const BookModel = mongoose.model("books", {
    image_url: String,
    title: String,
    rating: Number,
    description: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: "authors"
    }
})

module.exports = BookModel;