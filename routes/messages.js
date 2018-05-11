const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Message = mongoose.model('Message');
const Conversation = mongoose.model('Conversation');

// post a in conversation message
router.post('/conversation/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const messageBody = req.body.messageBody;

    // Conversation.findOne({ $or: [{participants: []}, {}] })
    Conversation.findOne({ participants: [req.user._id, req.params.userId] })
        .then(conversation => {
            if (conversation) {
                new Message({
                    conversation: conversation._id,
                    author: req.user._id,
                    body: messageBody
                })
                    .save()
                    .then(() => {
                        return res.send({
                            message: 'Message has successfully sent'
                        });
                    })
                    .then(err => {
                        res.send({ error: err });
                    });
            } else {
                new Conversation({
                    participants: [req.user._id, req.params.userId]
                })
                    .save()
                    .then(conversation => {
                        new Message({
                            conversation: conversation._id,
                            author: req.user._id,
                            body: messageBody
                        })
                            .save()
                            .then(() => {
                                return res.send({
                                    message: 'Message has successfully sent'
                                });
                            })
                            .then(err => {
                                res.send({ error: err });
                            });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// get a conversation list of a authorized user with the last message of each
router.get('/conversations', passport.authenticate('jwt', { session: false }), (req, res) => {
    Conversation.find({ participants: req.user._id })
        .then(conversations => {
            let fullConversations = [];
            conversations.forEach(conversations => {
                Message.find({ conversation: conversation._id })
                    .sort('-createdAt')
                    .limit('-1')
                    .populate({
                        path: author,
                        select: 'firstName lastName'
                    })
                    .then(message => {
                        fullConversations.push(message);
                        if (fullConversations.length === conversations.length) {
                            return res.send({ conversation: fullConversations });
                        }
                    })
                    .catch(err => {
                        res.send({ error: err });
                    });
            });
        })
        .catch(err => {
            res.send({ error: err });
        });
});

// get a conversation with all the messages in it
router.get('/conversation/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.find({ conversation: req.params.id })
        .sort('-createdAt')
        .populate({
            path: 'Author',
            select: 'firstName lastName'
        })
        .then(messages => {
            res.send(messages);
        })
        .catch(err => {
            res.send({ error: err });
        });
});

module.exports = router;
