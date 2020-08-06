const mysql = require("mysql2");
const  pool = mysql.createPool({
  host : 'localhost',
  user: 'projectx',
  password : 'projectx',
  database : 'project_x',
  port : '3306',
});

module.exports = pool;