const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');


/*router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/login.html'));
});*/

router.post('/', passport.authenticate('local', {session: true}),
    function(req, res) {
        console.log(req.session);
        //res.sendFile(path.resolve(__dirname, '../views/genkey.html'));
        //req.login(req.user, function (err) {}); // supposedly this is done automatically via .authenticate()
        res.send('success');
});


module.exports = router;
