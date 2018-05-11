const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const passport = require('passport');
const app = express();


// connect to the mongoDB
mongoose.connect(config.mongoURI, () => {
    console.log('connected to mongoDB');
});


// load passport configuration
require('./config/passport')(passport);


// load models
require('./models/User');


// load routes
const authRoutes = require('./routes/auth');


// use middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// init routes
app.use('/api', authRoutes);


// hire server and listen to the port
const PORT = process.env.PORT || 3001;
http.createServer(app)
    .listen(PORT, () => {
        console.log('listening on port:', PORT);
    });
