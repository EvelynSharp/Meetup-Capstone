require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//IMPORT LIBRARIES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/meetup-capstone';
mongoose.connect(dbUrl);

const app = express();

//AUTH CONTROLLER
const auth = require('./routes/auth');
//Event
const events = require('./routes/events');
//cloudinary
const cloudinarys = require('./routes/cloudinarys');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './client/build')));

//SETUP EXPRESS SESSION
app.use(require('express-session')({
 secret: process.env.SESSION_SECRET || 'secret',
 resave: false,
 saveUninitialized: false,
 cookie: {
   httpOnly: false,
   secure: false
 }
}));

//SETUP PASSPORT
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//AUTH ROUTES
app.use('/api/auth', auth);
//EVENT routes
app.use('/api/events', events);
//cloudinary routes
app.use('/api/cloudinarys', cloudinarys);


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
