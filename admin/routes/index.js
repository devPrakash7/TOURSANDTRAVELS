const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({status:true , message:"WELCOME TO OUR GEEKNOMIX ADMIN PANEL"})
});

module.exports = router;
