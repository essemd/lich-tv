const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./db/model');

const streams = require('./routes/streams');
const genkey = require('./routes/genkey');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const user = require('./routes/user');

const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, env === 'development' ? '.env.development' : '.env');
dotenv.config({ path: configPath });

const app = express();

app.use(express.json());

app.use(cors({
    origin: `http://${process.env.HOSTNAME}:${process.env.REACT_DEV_PORT}`,
    credentials: true
}));

app.use('/thumbnails', express.static('thumbnails'));

app.use(session({ 
    secret: 'jumbo jets', 
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.use(passport.initialize()); 
app.use(passport.session());

app.use('/', streams);
app.use('/genkey', genkey);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
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

const port = process.env.PORT || process.env.NODE_PORT;

app.listen(port, () => {
    mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    console.log(`Server up and running on port ${port}...`);
});
