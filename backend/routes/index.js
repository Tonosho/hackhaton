var express = require('express');
var router = express.Router();


router.get('/test', async (req, res) => {

  let test = "testing conection";

  res.json({ test });
});

module.exports = router;
