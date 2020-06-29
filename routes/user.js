const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var pool = require('../config/sql_config')


router.get('/login',(req,res)=>{
    res.send("Hello")
});

router.post('/login',(req,res) => {
    res.send("Login")
});

router.get('/register',(req,res) => {
    res.send("Register")
});

router.post('/register',(req,res) => {
    var {firstName,lastName,email,password,password2,dob} = req.body
    
    let errors = []
    // Empty fields
    if ( !firstName || !lastName || !email || !password || !password2 || !dob ){
        errors.push('empty fields');
    }
    // Passwords do not match
    if ( password !== password2 ){
        errors.push('passwords do not match');
    }
    // Check password length. TODO: Add more parameters for password!
    if ( password.length < 6 ){
        errors.push('passwords too short');
    }
    if ( errors.length > 0){
        res.status(500).send(errors);
    }
    // Validation passed. now check if user already exists
    else {
        let query = "SELECT * FROM User WHERE emailid=?"
        pool.query(query,email,(err,result) => {
            if (err) throw err;
            if (result.length > 0){
                // console.log(result);
                res.send('User already exists');
            }
            else {
                bcrypt.hash(password,10,(err,hash) => {
                    if (err) throw err;
                    password = hash;
                    // console.log(firstName,lastName,email,password,password2,dob);
                    let query = "INSERT INTO User(firstname,lastname,emailid,password,dob,level) VALUES (?,?,?,?,?,0)";
                    pool.query(query,[firstName,lastName,email,password,dob],(err,result) => {
                        if (err) throw err;
                        console.log(result);
                        res.send('Success!');
                    });
                });
            }
        });
    }
});

module.exports = router