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
        console.log("We verify the users credentials in this function!");
        return done(null, false);
    }));

app.get('/login',
  function(req, res) {
    res.sendFile('views/loginform.html', {root: __dirname});
  });

app.post('/login/password', passport.authenticate('local'),
    function(req, res) {
        res.send('If you can read this you are authenticated!');
});

app.listen(port, () => {
    mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    console.log(`Server up and running on port ${port}...`);
}); 
