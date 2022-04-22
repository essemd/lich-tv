const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

const configPath = path.resolve(__dirname, '../../config.env');
dotenv.config({ path: configPath });


router.get('/', function(req, res) {
    axios.get(`http://localhost:${process.env.HTTP_PORT}/api/streams`) // this mustn't be accessible from the outside, make sure it isnt
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
