const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../db/model');


router.post('/', function(req, res) {
    const newUser = new User({ username: req.body.username });
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save(function (err) {
      if (err) { 
        if (err.code === 11000) {
            return res.send('exists');
        } else {
            return res.send('failure');
        }
      } else {
        return res.send('success');
      }
    });
});


module.exports = router;
