const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

router.post('/', passport.authenticate('local', {session: true}),
    function(req, res) {
        res.send('success');
});


module.exports = router;
