const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/sql_config')

module.exports = {
    // next is not needed at the moment 
    register : async (req,res,next) => {
                try{
                    let {firstName,lastName,emailID,password,password2,dob} = req.body
                    let errors = []
                    // Empty fields
                    if ( !firstName || !lastName || !emailID || !password || !password2 || !dob ){
                        errors.push('empty fields');
                    }
                    // Passwords do not match
                    if ( password !== password2 ){
                        errors.push('passwords do not match');
                    }
                    // Check password length. TODO: Add more parameters for password!
                    if ( password.length < 6){
                        errors.push('passwords too short');
                    }
                    if ( errors.length > 1){
                        res.status(500).send(errors);
                    }
                    // Validation passed. now check if user already exists
                    else {
                        let query = "SELECT * FROM User WHERE emailID=?"
                        pool.query(query,emailID,(err,result) => {
                            if (err) throw err;
                            if (result.length > 0){
                                // console.log(result);
                                return res.status(200).send({
                                        success: true,
                                        message: 'User already exists'
                                    });
                            }
                            else {
                                bcrypt.hash(password,10,(err,hash) => {
                                    if (err) throw err;
                                    password = hash;
                                    let query = "INSERT INTO User(firstname,lastname,emailID,password,dob,level) VALUES (?,?,?,?,?,0)";
                                    pool.query(query,[firstName,lastName,emailID,password,dob],(err,result) => {
                                        if (err) throw err;
                                        return res.status(200).send({
                                        success: true,
                                        message: 'Registered'
                                    });
                                    });
                                });
                            }
                        });
                    }
            }
            catch{
                //--------blank at the moment------------// 
            }
            },
    logIn : async (req,res) => {
            try{
                const {email, password} = req.body
                if(!email || !password){
                    return res.status(400), res.send("enter both the fields")        
                }
                // query to get email id
                let query = "SELECT * FROM user WHERE emailID=?"
                pool.query(query,email,(err,result) => {
                    //login failure
                    if (err) throw err;

                    if (result.length < 1 || (result[0].password!=password) ){      
                        return res.status(401).send({
                            message: "Invalid username or password",
                           
                        });
                    }
                    else{
                        // -------------if login success create jwt-----------//

                        let token = jwt.sign(email, process.env.SECRET_KEY);
                        // return res.status(200).send({message: 'You are now signed in', token: token});
                        return res.status(200).send({
                            success : true,
                            auth_token : token
                        });


                    }
                });
            }
            catch{
            }
    },
    homepage : async ( req, res) =>{
 
        res.send({
            user : req.user,
            post : 'you should nott access it without logging'
        })

        // User.findbyone({_id : req.user})


    },
    booksFetch :  async (req,res) => {
            try { 
                let query = "SELECT * FROM bookv3 LIMIT 10";
                pool.query(query,(err,result) => {
                    return res.status(200).send({result})
                      })
                }
            catch{

            }
    },

    book : async ( req, res) =>{
        try{
            const bookid = req.body.id
            console.log(bookid)
            let query = "SELECT * FROM bookv3 WHERE id=? ";
                pool.query(query,bookid,(err,result) => {
                    return res.status(200).send({result})
                      })
        }
        catch{

        }
    }
}