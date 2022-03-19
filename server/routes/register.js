const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../db/model');


router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/register.html'));
});

router.post('/', function(req, res) {
    const newUser = new User({ username: req.body.username,});
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function (err) {
      if (err) return handleError(err);
      res.end();
    });
});


module.exports = router;
