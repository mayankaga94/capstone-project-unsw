const mysql = require('mysql')
const Sequelize = require('sequelize')

const  pool = mysql.createPool({
  host : 'localhost',
  user: 'root',
  password : 'root',
  database : 'users',
  port : '8889',
});

// Ping database to check for common exception errors.



pool.getConnection((err, connection) => {
  if (err) {
    
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
    console.log("[mysql error]",err);
  }
  if (connection) connection.release()
  return
})
pool.Sequelize = Sequelize
module.exports = pool
