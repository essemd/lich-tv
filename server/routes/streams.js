const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(req, res) {
    axios.get('http://localhost:8000/api/streams') // this mustn't be accessible from the outside, make sure it isnt
        .then((response) => {
            if (response.data.live) { // there is at least one incoming live stream
                let streamKeys = Object.keys(response.data.live);
                res.render('index', {
                    streamKey: streamKeys[0] // render just the first stream in the list for now
                });
            } else {
                res.render('index', {streamKey: 'abcdefg'}); // temp for testing
            }
        });
});


module.exports = router;
