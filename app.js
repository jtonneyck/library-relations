const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }))

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');    

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

app.use(middleWareExample2); 
// app.use("/books", protect); // the protect middleware is only called if requests have a path that starts with '/path'

app.set("view engine", "hbs");
mongoose.connect(process.env.db, { 
        useNewUrlParser: true,  
        useUnifiedTopology: true 
    })
    .then((connection)=> {
        console.log("connected to mongodb");
    })
    .catch(err=> {
        console.log("not connected to mongodb:", err);
    })

// middleware definition
function protect(req,res,next){
    if(req.session.currentUser) next();
    else res.redirect("/user/login");
}
// middleware definition
function middleWareExample2(req,res,next){
    console.log("middle");
    next();
}

app.use("/books", require("./routes/books")); // all routes in ./routes/books will have "/books" prepended to their path
app.use("/user", require("./routes/user"));

app.use((err, req, res, next)=> {
    res.render("error.hbs", {message: err});
})

app.listen(process.env.PORT, ()=> {
    console.log("Express is listening on", process.env.PORT);
})