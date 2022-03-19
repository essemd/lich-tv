const express = require('express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid'); // for generating streaming keys
const User = require('../db/model');


router.post('/', function(req, res) {
    User.findOneAndUpdate(
        { username: req.session.passport.user.username }, 
        { stream_key: shortid.generate() },
        { new: true }, // the user callback variable 
        (err, user) => {
            if (err) console.log(err);
            if (user) {
                res.json({
                    stream_key: user.stream_key
                });
            }
            res.sendFile(path.resolve(__dirname, '../views/login.html')); // session expired
        });
});


module.exports = router;