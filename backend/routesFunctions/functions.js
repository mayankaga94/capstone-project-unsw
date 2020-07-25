const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/sql_config')
const Review = require('../models/Review')

module.exports = {
    // next is not needed at the moment 
    register :  async(req,res,next) => {
                try{
                    console.log(req.body)
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
                        let query = "SELECT * FROM user WHERE emailiD = ?"
                        pool.query(query,emailID,(err,result) => {
                            console.log("hit 1")
                            if (err) throw err;
                            if (result.length > 0){
                                // console.log(result);
                                return res.status(200).send({
                                        success: true,
                                        message: 'User already exists'
                                    });
                            }
                            else {
                                console.log('hit')
                                bcrypt.hash(password,10,(err,hash) => {
                                    if (err) throw err;
                                    password = hash;
                                    let query = "INSERT INTO User(firstname,lastname,emailiD,password,dob,level) VALUES (?,?,?,?,?,0)";
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
            catch(err){
                //--------blank at the moment------------// 
                res.status(500).send(err)
            }
            },
    logIn : async (req,res) => {
            try{

                console.log("hi")
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
                                                        auth_token : token,
                                                        userEmail : email
                                                    });


                    }
                });
            }
            catch{
            }
    },
    userDetails : async( req, res) =>{
                    const userDetails = req.user
                    let query = "SELECT * FROM user WHERE emailID=?"
                    pool.query(query,userDetails,(err,result) => {
                        if (err) throw err;
                        return res.status(200).send({
                            result
                        });
                    });
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
                        let query = "SELECT * FROM book_dataset LIMIT 30";
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
                let query = "SELECT * FROM book_dataset WHERE ISBN=? ";
                    pool.query(query,bookid,(err,result) => {
                        return res.status(200).send({result})
                        })
            }
            catch{

        }
    },
    postReview : async(req, res) =>  {
        try {
            let {bookid,userid,comment} = req.body

            // check if user exists
            // userExists(userid,res);
            // pool.query('SELECT * FROM User WHERE userid=?',userid,userExists);
            // pool.query('SELECT * FROM User WHERE userid=?',userid,(err,result) => {
            // pool.query('SELECT * FROM User WHERE userid=?',userid,(err,result) => {
            //     if(err) throw err;
            //     if (result.length == 0){
            //         return res.status(200).send({
            //             success: false,
            //             message: 'User does not exist'
            //         });
            //     }
            // });
            // check if book exists
            // bookExists(bookid,res);
            // console.log("bad")
            // pool.query('SELECT * FROM book_dataset WHERE ISBN=?',bookid,(err,result) => {
            //     if(err) throw err;
            //     if (result.length == 0){
            //         return res.status(200).send({
            //             success: false,
            //             message: 'book does not exist'
            //         });
            //     }
            // });

            let newReview = new Review({
                'userid': userid,
                'bookid': bookid,
                'comment': comment
            });

            console.log(req.body)
            // insert review
            await newReview.save();
            res.status(200).send('success')
        }
        catch(err) {
            res.status(500).send(err);
        }
    },
    postRating : (req, res) => {
        try {
            let {bookid,userid,rating} = req.body

            // check if user has rated this book before
            // pool.query('SELECT * FROM book_ratings WHERE userid=? AND bookid=?',[userid,bookid],(err,result) => {
            //     if (err) throw err;
            //     if (result.length > 0){
            //         return res.status(200).send({
            //                 success: false,
            //                 message: 'User has already rated this book'
            //             });
            //     }
            // });
            let query = "INSERT INTO book_ratings(bookid,userid,rating) VALUES (?,?,?)";
            pool.query(query,[bookid,userid,rating],(err,result) => {
                if (err) throw err;
                return res.status(200).send({
                success: true
                });
            });
            // res.status(200).send('success');
        }
        catch(err) {
            console.log(err)
            return res.status(500).send(err);
        }
    },
    adminRegister : async (req,res) => {
        try{
            let {userName,firstName,lastName,emailID,password,password2,secretKey} = req.body
            let errors = []
            // Empty fields
            if ( !userName || !firstName || !lastName || !emailID || !password || !password2 || !secretKey ){
                errors.push('empty fields');
            }
            //pre-defined secret key for admin, key is hard coded 
            if (secretKey != 'secretAdminKey'){
                errors.push('Secret Key Does Not Match, Please Contact Website Owner.')
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
                let query = "SELECT * FROM adminlogin WHERE username = ? or email = ?";
                pool.query(query,[userName, emailID],(err,result) => {
                    if (err) throw err;
                    if (result.length > 0){
                        // console.log(result);
                        return res.status(200).send({
                                success: true,
                                message: 'Admin already exists'
                            });
                    }
                    else {
                        bcrypt.hash(password,10,(err,hash) => {
                            if (err) throw err;
                            password = hash;
                            let query = "INSERT INTO adminlogin(username,firstname,lastname,email,password) VALUES (?,?,?,?,?)";
                            pool.query(query,[userName,firstName,lastName,emailID,password],(err,result) => {
                                if (err) throw err;
                                return res.status(200).send({
                                success: true,
                                message: 'Admin Registered'
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
    adminLogin : async (req,res) => {
        try{
            let {userName, password} = req.body
            if(!userName || !password){
                return res.status(400), res.send("enter both the fields")        
            }
            // query to get email id
            let query = "SELECT * FROM adminlogin WHERE username=?"
            pool.query(query,userName,(err,result) => {
                //login failure
                if (err) throw err;
                bcrypt.hash(password,10,(err,hash) =>{
                    password = hash;
                });
                if (result.length < 1 || !bcrypt.compare(password, result[0].password) ){      
                    return res.status(401).send({
                        message: "Invalid username",
                    });
                }
                else{
                    // -------------if login success create jwt-----------//
                    const match = bcrypt.compare(password, result[0].password, function (err,isMatch){
                        if (err) throw err;
                        if (!isMatch){
                            return res.status(401).send({
                                message: "Invalid password",
                            });
                        }
                        else{
                            //return res.status(200).send({message: 'You are now signed in'});
                            let token = jwt.sign(userName, ""+process.env.SECRET_KEY);
                            return res.status(200).send({
                            success : true,
                            auth_token : token
                            });
                        }
                    });
                }
            });
        }
        catch{
        }
    },
    addBook : async (req,res) => {
        let {title, author, description, ISBN, genre, image, pagecount} = req.body;
        if ( !title || !author || !description || !ISBN || !genre || !image || !pagecount ){
            res.status(500).send('empty fields')
        }
        else{
            let query = "SELECT * FROM book_dataset WHERE ISBN = ?";
            pool.query(query, ISBN, (err, result) => {
                if (err) throw err;
                if (result.length > 0){
                    return res.status(200).send({
                        success: true,
                        message: 'Book already exists'
                    });
                }
                else{
                    let query = "INSERT INTO book_dataset VALUES (?,?,?,?,?,?,?,?,?,?)";
                    pool.query(query, [title, author, 1.0, 0, "0", description, ISBN, genre, image, pagecount], (err, result) => {
                        if (err) throw err;
                        return res.status(200).send({
                            success : true,
                            message : "Book Added"
                        })
                    })
                }
            })
        }
    },
    removeBook: async (req,res) => {
        let {ISBN} = req.body;
        console.log("ISBN IS " + ISBN);
        if (!ISBN){
            res.status(500).send('empty fields')
        }
        else {
            let query = "SELECT * FROM book_dataset WHERE ISBN = ?";
            pool.query(query, ISBN, (err, result) => {
                if (err) throw err;
                if (result.length == 0){
                    return res.status(200).send({
                        success: true,
                        message: 'Book does not exist'
                    });
                }
                else{
                    let query = "DELETE FROM book_dataset WHERE ISBN = ?";
                    pool.query(query, ISBN, (err, result) => {
                        if (err) throw err;
                        return res.status(200).send({
                            success : true,
                            message : "Book Removed"
                        })
                    })
                }
            })
        }
    },
    searchBookByTitle:(req, res) => {
        try {
            let {booktitle} = req.body
            let query = "Select ISBN from book_dataset where title like CONCAT('%', ?, '%')";
            pool.query(query,booktitle,(err,result) => {
                if (err) throw err;
                return res.status(200).send({result})
                success: true
                });
            }
            // res.status(200).send('success');
        
        catch(err) {
            console.log(err)
            return res.status(500).send(err);
        }
    },
    searchBookByGenre:(req, res) => {
        try {
            let {booktitle} = req.body
            let query = "Select ISBN from book_dataset where genre like CONCAT('%', ?, '%')";
            pool.query(query,booktitle,(err,result) => {
                if (err) throw err;
                return res.status(200).send({result})
                success: true
                });
            }
            // res.status(200).send('success');
        
        catch(err) {
            console.log(err)
            return res.status(500).send(err);
        }
    },
}
