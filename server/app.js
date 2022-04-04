const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config({ path: 'config.env' });
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // need this if we're going to be POSTing
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./db/model');
const streams = require('./routes/streams');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const genkey = require('./routes/genkey');
const user = require('./routes/user');

const app = express();

const port = process.env.PORT | 5000;

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use('/thumbnails', express.static('thumbnails'));
app.use(session({ 
    secret: 'jumbo jets', 
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize()); 
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use('/', streams);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/genkey', genkey);
app.use('/user', user);

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message: 'Username not found'}); }
            if (!user.validPassword(password)) { return done(null, false, {message: 'Incorrect password'}); }
            return done(null, user); // user exists and password is valid
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
});
      
passport.deserializeUser(function(user, done) {
    done(null, user);
});

/*passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});*/

app.listen(port, () => {
    mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    console.log(`Server up and running on port ${port}...`);
});
