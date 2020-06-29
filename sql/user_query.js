//! Just for testing do not use!!!!

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const db_options = require('../config/sql_config');
const { connect } = require('mongoose');

var con = mysql.createConnection(db_options);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var password = 'mayankaga94'
  bcrypt.hash(password,10,(err,hash) => {
    if (err) throw err;
    password = hash;
    // var q = "INSERT INTO User(firstname,lastname,emailid,password,dob) VALUES ('Mayank','Agarwal','mayankaga94@gmail.com',?,'27/12/1994')"
    var q = "SELECT * FROM User WHERE emailid=?";
    // var q = "UPDATE User SET dob = '1994-12-27' WHERE emailid = ?";
    con.query(q,['mayankaga94@gmail.com'],(err,result) => {
      if(err) throw err;
      console.log(result);
    });
    // console.log(firstName,lastName,email,password,password2,dob);
});


  //   con.query("SHOW tables",function(err,result){
  //       if (err) throw err;
  //       console.log(result)
  //   })
  });
