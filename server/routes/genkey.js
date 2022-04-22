const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const shortid = require('shortid'); // for generating streaming keys
const User = require('../db/model');

router.get('/', function(req, res) {
    if (req.user) {
        User.findOneAndUpdate(
            { username: req.user.username }, 
            { stream_key: shortid.generate() },
            { new: true }, 

            (err, user) => {
                if (err) console.log(err);
                if (user) {
                    res.json({
                        stream_key: user.stream_key
                    });
                } else {
                    res.send('couldnt find user in db');
                }
            }
        );
    } else {
        res.send('req.user is undefined');
    }
});

module.exports = router;
