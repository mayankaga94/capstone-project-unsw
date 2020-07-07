var express = require('express');
var router = express.Router();
var dbmodule = require('../database/db_SQL.js');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/adminlogin',  (req, res) => {
  var username = req.body.username;
  var pass = req.body.password;
  dbmodule.authenticateAdmin(username, pass, res);
});


router.post('/adminregister', (req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  //var key = req.body.key;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  dbmodule.registeAdmin(username, firstname, lastname, email, password, res);
})
module.exports = router;
