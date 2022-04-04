const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    console.log("/logout route");
    console.log('before logout');
    console.log(req.user);

    req.logout();

    console.log('after logout');
    console.log(req.user);

    res.send('success');
});


module.exports = router;
