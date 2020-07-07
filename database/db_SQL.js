var mysql = require("mysql");
var express = require('express');
var session = require('express-session');

var connection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12350649",
    password: "E6beiBZqqV",
    database: "sql12350649"
});


exports.authenticateAdmin = function (username, password, res) {
    connection.query('SELECT * FROM adminlogin WHERE username = ? AND password = ?', [username, password], function(error, results) {
        if (results.length > 0) {
            res.send('<h1>login sucess</h1>');
        } else {
            res.send('<h1>login failed</h1>');
        }
        res.end();
    });
};

exports.registeAdmin = function (username, firstname, lastname, email, password, res) {
    connection.query('SELECT * FROM adminlogin WHERE username = ? or email = ?', [username, email], function(error, results) {
        if (results.length > 0) {
            res.send('Admin or Email already exist');
            res.end();
        } else{
            connection.query('insert into adminlogin values (?,?,?,?,?)', [username, firstname, lastname, email, password]);
            res.send("Registe success");
            res.end();
        }
    });
};
