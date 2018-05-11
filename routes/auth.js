const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const router = express.Router();

// load models
const User = mongoose.model('User');

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (user) {
                res.status(422).send({
                    message: 'The email already registered'
                });
                return;
            } else {
                new User({ email, password }).save().then(newUser => {
                    res.send({
                        message: 'User created successfully'
                    });
                });
            }
        })
        .catch(err => {
            console.log('err', err);
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (user) {
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payload = Object.assign({}, user.toObject());
                    delete payload.password;
                    const token = jwt.sign(payload, secret);
                    return res.send({ payload, token });
                } else {
                    return res.status(422).send({
                        message: 'Wrong email or password'
                    });
                }
            });
        }
    });
});

module.exports = router;
