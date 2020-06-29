// ! Just for testing do not commits

var mysql = require('mysql');
var db_options = require('./config/sql_config')

var con = mysql.createConnection(db_options);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
//   con.query("SHOW tables",function(err,result){
//       if (err) throw err;
//       console.log(result)
//   })
});

// con.close()