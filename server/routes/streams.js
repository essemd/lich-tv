const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

//const env = process.env.NODE_ENV || 'development';
//const configPath = path.resolve(__dirname, env === 'development' ? '../.env.development' : '../.env');
const configPath = path.resolve(__dirname, '.env');
dotenv.config({ path: configPath });

router.get('/', function(req, res) {
    axios.get(`http://${process.env.HOSTNAME}:${process.env.HTTP_PORT}/api/streams`) // this mustn't be accessible from the outside, make sure it isnt
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
