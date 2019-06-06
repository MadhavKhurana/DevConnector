const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/Users.js");
const keys = require("../../config/keys");
const passport = require("passport");

//const validateRegisterInput=require('../../validation/register.js')
//
//router.get('/test',(req,res)=>res.json({msg:'Users Works'}))

router.post("/register", (req, res) => {
    //    const {errors,isValid}=validateRegisterInput(req.body)
    //
    //    if(!isValid){
    //        return res.status(400).json(errors)
    //    }

    if (!req.body.name || req.body.name.length < 3 || req.body.name > 30) {
        res.status(400).json({
            msg: "Name must be betwwen 2 and 30 characters"
        });
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already Exist" });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: "User not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User Matched

                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                };

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3000000000 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passowrd: "Password incorrect" });
            }
        });
    });
});

router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router;
