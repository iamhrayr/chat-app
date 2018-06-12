const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const passport = require('passport');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

// connect to the mongoDB
mongoose.connect(
    config.mongoURI,
    () => {
        console.log('connected to mongoDB');
    }
);

// load models
require('./models/User');
require('./models/Message');
require('./models/Conversation');

// load passport configuration
require('./config/passport')(passport);

// load routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/messages');

// use middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// init routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// hire server and listen to the port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('listening on port:', PORT);
});

// socket connections
const sockets = {};
io.use(
    socketioJwt.authorize({
        secret: config.secret,
        handshake: true
    })
);

io.on('connection', socket => {
    console.log('hello! ', socket.decoded_token);

    sockets[socket.decoded_token._id] = socket;

    socket.on('message', data => {
        if (sockets[data.userId]) {
            sockets[data.userId].emit('message', data.message);
        }
        new Message({
            conversation: 'TO_THINK_ABOUT',
            author: socket.decoded_token._id,
            body: data.message
        });

    });

    socket.on('disconnect', reason => {
        console.log('disc', reason);
        delete sockets[socket.decoded_token._id];
    });
});