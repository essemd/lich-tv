const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(req, res) {
    axios.get('http://localhost:8888/api/streams') // this mustn't be accessible from the outside, make sure it isnt
        .then((response) => {
            if (response.data.live) { // there is at least one incoming live stream
                //let streamKeys = Object.keys(response.data.live);
                /*res.render('index', {
                    streamKeys: streamKeys // render just the first stream in the list for now
                });*/
                res.json({ids: Object.keys(response.data.live)});
            } else {
                //res.render('index', {streamKey: 'abcdefg'}); // temp for testing
                //res.render('sandbox');
                res.json({ids: ['2mp9M3aOpaaa']});
            }
        });
});


module.exports = router;
