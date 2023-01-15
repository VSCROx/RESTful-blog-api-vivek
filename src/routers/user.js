const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/blogs/signup", (req, res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            })
        }else{
            const user = new User({
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user: result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error: err
                })
            })
        }

    })
})


router.post('/blogs/login', (req, res)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                msg: 'user not exist...Try to signup!'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(!result){
                return res.status(401).json({
                    msg: 'password matching fail'
                })
            }
            if(result){
                const token = jwt.sign({
                    username: user[0].username,
                    email: user[0].email,
                    phone: user[0].phone
                }, 'vivekuserloginsecrettoken',{
                    expiresIn: "24h"
                });

                res.status(200).json({
                    msg: "user login successfully",
                    username: user[0].username,
                    email: user[0].email,
                    phone: user[0].phone,
                    token: token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err: err
        })
    })
})


module.exports = router;