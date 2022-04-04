const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
  console.log("/user route");
  console.log(req.user);

  res.send(req.user);
});


module.exports = router;
