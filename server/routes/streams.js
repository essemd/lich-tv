const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(req, res) {
    // query nms connected clients api
    // send html with all active streams playing
    axios.get('http://localhost:8000/api/streams')
        .then((response) => {
            let streamKeys = Object.keys(response.data.live);
            res.render('index', {
                streamKey: streamKeys[0]
            });
        });
});


module.exports = router;