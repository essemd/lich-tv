const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // need this if we're going to be POSTing
const passport = require('passport');
const LocalStrategy = require('passport-local');

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("We do nothing as a strategy!");
        return done(null, false);
    }));

app.get('/login',
  function(req, res) {
    res.sendFile('views/loginform.html', {root: __dirname});
  });

app.post('/login/password', passport.authenticate('local'),
    function(req, res) {
        res.send('Hello world!');
});

app.listen(port, () => {
    console.log('Server up and running...');
});