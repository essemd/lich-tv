const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/login.html'));
});

router.post('/', passport.authenticate('local', {session: false}), // dont need a session atm
    function(req, res) {
        res.send('If you can read this you are authenticated!');
});


module.exports = router;
