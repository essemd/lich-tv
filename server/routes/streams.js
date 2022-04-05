const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', function(req, res) {
    axios.get('http://localhost:8888/api/streams') // this mustn't be accessible from the outside, make sure it isnt
        .then((response) => {
            if (response.data.live) { // there is at least one incoming live stream
                res.json({ids: Object.keys(response.data.live)});
            } else {
                res.json({ids: ['nobody-is-streaming-streamkey']});
            }
        })
        .catch((err) => {
            res.send(err);
        });
});


module.exports = router;
