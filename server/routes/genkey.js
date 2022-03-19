const express = require('express');
const router = express.Router();
const shortid = require('shortid'); // for generating streaming keys
const User = require('../db/model');


router.post('/', function(req, res) {

    User.findOneAndUpdate(
        { username: req.session.passport.username }, 
        { streamkey: shortid.generate() },
        { new: true }, // the user callback variable 
        (err, user) => {
            if (!err) {
                res.json({
                    stream_key: user.streamkey
                });
            }
        });
});


module.exports = router;