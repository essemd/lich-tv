const express = require('express');

const router = express.Router();
const path = require('path');
const User = require('../db/model');

router.post('/', (req, res) => {
  const newUser = new User({ username: req.body.username });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.send('exists');
      }
      return res.send('failure');
    }
    return res.send('success');
  });
});

module.exports = router;
