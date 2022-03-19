const express = require('express');
const app = express();
require('dotenv').config({ path: 'config.env' });
const bodyParser = require('body-parser'); // need this if we're going to be POSTing
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = require('./db/model');

const port = process.env.PORT | 5000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message: 'Username not found'}); }
            if (!user.validPassword(password)) { return done(null, false, {message: 'Incorrect password'}); }
            return done(null, user); // user exists and password is valid
        });
    }));

/* this pair of functions determines what data of the user object needs to be stored (at req.session.passport.user) 
in the session, and how to retreive said data */
passport.serializeUser(function(user, done) {
    done(null, user);
});
      
passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.get('/register', function(req, res) {
    res.sendFile('views/register.html', {root: __dirname});
});

app.get('/login', function(req, res) {
    res.sendFile('views/login.html', {root: __dirname});
});

app.post('/register/', function(req, res) {
    const newUser = new User({ username: req.body.username,});
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function (err) {
      if (err) return handleError(err);
      res.end();
    });
});

app.post('/login/', passport.authenticate('local', {session: false}), // dont need a session atm
    function(req, res) {
        res.send('If you can read this you are authenticated!');
});

app.listen(port, () => {
    mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    console.log(`Server up and running on port ${port}...`);
});
