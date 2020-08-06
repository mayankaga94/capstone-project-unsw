// const util = require('util')
const mysql = require('mysql2')
const pool = require('./sql_key')

// Change this key according to your mysql database and 
// store it into another file and import into pool as above
// put that file in .gitignore so it remains different for everyone

// const  pool = mysql.createPool({
//   host : 'localhost',
//   user: 'projectx',
//   password : 'projectx',
//   database : 'book_database',
//   port : '3306',
// });

// Ping database to check for common exception errors.

// pool.getConnection((err, connection) => {
//   if (err) {
    
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('Database connection was closed.')
//     }
//     if (err.code === 'ER_CON_COUNT_ERROR') {
//       console.error('Database has too many connections.')
//     }
//     if (err.code === 'ECONNREFUSED') {
//       console.error('Database connection was refused.')
//     }
//     console.log("[mysql error]",err);
//   }
//   if (connection) connection.release()
//   console.log("sql connected")
//   return
// })
const promisePool = pool.promise();
// pool.Sequelize = Sequelize
// pool.query = util.promisify(pool.query)
module.exports = promisePool