const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const requireAuth = require('../helpers/requireAuth');

const Message = mongoose.model('Message');
const Conversation = mongoose.model('Conversation');

// post a new message in conversation
router.post('/conversation/:userId', requireAuth, (req, res) => {
    const messageBody = req.body.messageBody;

    Conversation.findOne({
        $and: [{ participants: req.user._id }, { participants: req.params.userId }]
    })
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
                    .catch(err => {
                        res.send({
                            error: err
                        });
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
                            .catch(err => {
                                res.send({
                                    error: err
                                });
                            });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// get a conversation list of a authorized user with the last message of each
router.get('/conversations', requireAuth, (req, res) => {
    Conversation.find({
        participants: req.user._id
    })
        .then(conversations => {
            let fullConversations = [];
            conversations.forEach(conversation => {
                Message.find({
                    conversation: conversation._id
                })
                    .select('-_id')
                    .sort('-createdAt')
                    .limit('-1')
                    .populate({
                        path: 'author',
                        select: 'firstName lastName -_id '
                    })
                    .then(messages => {
                        // messages is array because we are filtering with limit, but still using find instead of findOne
                        fullConversations.push(messages[0]);
                        if (fullConversations.length === conversations.length) {
                            return res.send(fullConversations);
                        }
                    })
                    .catch(err => {
                        res.send({
                            error: err
                        });
                    });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(422).send({
                error: err
            });
        });
});

// get a conversation with all the messages in it
router.get('/conversation/:id', requireAuth, (req, res) => {
    Conversation.findOne({
        _id: req.params.id
    }).then(conversation => {
        if (conversation.participants.indexOf(req.user._id) >= 0) {
            Message.find({
                conversation: req.params.id
            })
                .sort('-createdAt')
                .populate({
                    path: 'author',
                    select: 'firstName lastName'
                })
                .then(messages => {
                    res.send(messages);
                })
                .catch(err => {
                    res.send({
                        error: err
                    });
                });
        } else {
            res.status(401).send({
                error: "You don't have a permission to view this conversation"
            });
        }
    });
});

module.exports = router;
