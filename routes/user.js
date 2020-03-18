const express = require("express");
const router = express.Router(); // Router is like a lightweight app. You can use it exactly the same way except you can't listen on it. 
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.get("/signup", (req,res)=> {
    res.render("user/signup.hbs");
})

router.post("/signup", (req,res, next)=> {
    // const username = req.body.username;
    // const password = req.body.password;
    const {username, password} = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) next("hashing error");
        else {
            User
            .create({
                username: username, 
                password: hash
            })
            .then((user)=> {
                res.redirect("/user/login"); // instruct the browser to make a get request to /user/login (http://localhost:3000 is implicit)
            })
            .catch((err)=> {
                res.send("user not created", err);
            })
        }
    });

   
})


router.get("/login", (req,res)=> {
    res.render("user/login");
})

router.post("/login", (req,res,next)=> {
    const {username, password} = req.body; // short hand notation for the uncommented code below
    // const username = req.body.username;
    // const password = req.body.password;
    User.findOne({
        username // short hand notation for {username: username}
    })
    .then((user)=> {
        if(!user) res.send("invalid credentials.")
        else {
            bcrypt.compare(password, user.password, function(err, correctPassword) {
                if(err) next("hash compare error");
                else if(!correctPassword) res.send("invalid credentials.");
                else {
                    req.session.currentUser = user;
                    res.redirect("/user/profile");
                }
            });
        }
    })
    .catch((err)=> {
        res.send("Error, not logged in.")
    })
})



module.exports = router;