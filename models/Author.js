const mongoose = require("mongoose");

const AuthorModel = mongoose.model("authors", {
    image_url: String,
    firstName: String,
    lastName: String,
    nationality: String,
    birthday: Date
});

module.exports = AuthorModel;