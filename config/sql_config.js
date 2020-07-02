// const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "sql12.freemysqlhosting.net",
    user: "sql12350649",
    password: "E6beiBZqqV",
    database: "sql12350649"
})

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
  }

  if (connection) connection.release()

  return
})

// Implement later
// Promisify for Node.js async/await.
// pool.query = util.promisify(pool.query)

module.exports = pool

// db_options = {
//     host: "sql12.freemysqlhosting.net",
//     user: "sql12350649",
//     password: "E6beiBZqqV",
//     database: "sql12350649"
//   }

// local options (always comment out)

// db_options = {
//     host: "localhost",
//     user: "projectx",
//     password: "projectx",
//     database: "book_database"
//   }

// module.exports = db_options