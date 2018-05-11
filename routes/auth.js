const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const router = express.Router();

// load models
const User = mongoose.model('User');

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {
            if (user) {
                res.status(422).send({
                    message: 'The username already exists'
                });
                return;
            } else {
                new User({
                    username,
                    password
                }).save().then(newUser => {
                    res.send({
                        message: 'User created successfully'
                    })
                })
            }
        })
        .catch(err => {
            console.log('err', err);
        })

});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    
    User.findOne({username}).then(user => {
        if (user) {
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user, secret);
                    return res.send({user, token});
                } else {
                    return res.status(422).send({
                        message: 'Wrong username or password'
                    })
                }
            });
        }
    })
})

module.exports = router;