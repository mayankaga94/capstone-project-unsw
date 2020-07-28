const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/sql_config')

module.exports = {
    // next is not needed at the moment 
    register :  async(req,res,next) => {
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
                let query = "SELECT * FROM user WHERE emailid = ?";
                result = await pool.query(query,emailID);
                if (result[0].length > 0){
                    return res.status(200).send({
                            success: true,
                            message: 'User already exists'
                        });
                }
                password = bcrypt.hashSync(password,10)
                // console.log(password)
                let query2 = "INSERT INTO user(firstname,lastname,emailID,password,dob,level) VALUES (?,?,?,?,?,1)";
                await pool.query(query2,[firstName,lastName,emailID,password,dob]);
                return res.status(200).send({
                    success: true,
                    message: 'Registered'
                    });
            }
    }
        catch(err){
            //--------blank at the moment------------// 
            return res.status(500).send(err)
        }
    },
    logIn : async (req,res) => {
            try{
                const {email, password} = req.body
                if(!email || !password){
                    return res.status(400).send("enter both the fields")        
                }
                // query to get email id
                let query = "SELECT * FROM user WHERE emailID=?"
                var result = await pool.query(query,email);
                if(result[0].length == 0){
                    return res.status(401).send({
                        message: "User does not exist",
                    });
                }
                bcrypt.compare(password,result[0][0].password,(err,isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        // -------------if login success create jwt-----------//
                        let token = jwt.sign(email, process.env.SECRET_KEY);
                        // return res.status(200).send({message: 'You are now signed in', token: token});
                        return res.status(200).send({
                            auth_token : token,
                            userEmail : email
                        });
                    }
                    else {
                        res.send("Email or password incorrect!");
                    }
                });
            }
            catch{
                return res.status(500).send(err);
            }
    },
    userDetails : async( req, res) =>{
        try{
            const userDetails = req.user
            let query = "SELECT * FROM user WHERE emailID=?"
            var result = await pool.query(query,userDetails)
            return res.status(200).send({
                result :result[0]
            });
        }
        catch(err){
            return res.status(500).send(err);
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
            let query = "SELECT * FROM book_dataset LIMIT 30";
            pool.query(query,(err,result) => {
                return res.status(200).send({result})
                })
            }
        catch{
            return res.status(500).send(err);
        }
    },
    book : async ( req, res) =>{
        try{
            const bookid = req.body.id
            let query = "SELECT * FROM book_dataset WHERE ISBN=? ";
            var result = await pool.query(query,bookid)
            return res.status(200).send({
                result: result[0]
            })
        }
        catch{
            return res.status(500).send(err);
        }
    },
    postReview : async(req, res) =>  {
        try {
            let {bookid,userid,comment} = req.body
            // check if user exists
            var result = await pool.query('SELECT * FROM user WHERE userid=?',userid)
            if (result[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'User does not exist'
                });
            }
            // check if book exists
            var result2 = await pool.query('SELECT * FROM book_dataset WHERE ISBN=?',bookid)
            if (result2[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'book does not exist'
                });
            }
            let query = "INSERT into review(userid,bookid,comment) values (?,?,?)"
            var result = await pool.query(query, [userid,bookid,comment])
            return res.status(200).send({
                reviewID :result[0].insertId
            });
    }
        catch(err) {
            return res.status(500).send(err);
        }
    },
    updateReview : async(req, res) => {
        try{
            var {reviewID, comment} = req.body
            var result = await pool.query('SELECT * FROM review WHERE reviewid=?',reviewID);
            if (result[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'Review does not exist'
                });
            }
            // update review
            await pool.query("UPDATE review SET comment=? WHERE reviewid=?",[comment,reviewID]);
            return res.status(200).send({
                success: true,
                message: "Review updated"
            })
        }
        catch(err){
            return res.status(500).send(err);
        }
    },
    deleteReview : async(req, res) => {
        try {

            // After deleting review
            // delete all instances of review from votes
            // update points of user that posted that review ??
            const reviewid = req.body.delete;
            // delete all entries of vote for the review
            await pool.query("DELETE FROM vote WHERE reviewid=?",reviewid);
            // delete the review
            await pool.query("DELETE FROM review WHERE reviewid=?",reviewid);
            return res.status(200).send({
                success: true,
                message: 'Review Deleted'
            });

        }
        catch (err) {
            return res.status(500).send(err);
        }
    },
    postRating : async (req, res) => {
        try {
            let {bookid,userid,rating} = req.body
            
            if(rating < 0 || rating > 5){
                return res.status(200).send({
                    success: false,
                    message: 'Rating value should be between 0 and 5'
                });
            }
            // check if user exists
            var user = await pool.query('SELECT * FROM user WHERE userid=?',userid)
            if (user[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'User does not exist'
                });
            }
            // check if book exists
            var result2 = await pool.query('SELECT * FROM book_dataset WHERE ISBN=?',bookid)
            if (result2[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'book does not exist'
                });
            }
            var result2 = await pool.query('SELECT * FROM book_ratings WHERE userid=? AND bookid=?',[userid,bookid])
            if (result2[0].length > 0){
                await pool.query('UPDATE book_ratings SET rating = ? WHERE userid=? AND bookid=?',[rating,userid,bookid])
                return res.status(200).send("Updated rating");
            }
            let query = "INSERT INTO book_ratings(bookid,userid,rating) VALUES (?,?,?)";
            
            var result = await pool.query(query,[bookid,userid,rating]);
            res.status(200).send({success: true});
        }
        catch(err) {
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
        try{
            let {title, author, description, ISBN, genre, image, pagecount} = req.body;
            if ( !title || !author || !description || !ISBN || !genre || !image || !pagecount ){
                res.status(500).send('empty fields')
            }
            else{
                var query = "SELECT * FROM book_dataset WHERE ISBN = ?";
                var result = pool.query(query, ISBN);
                if (result[0].length > 0){
                    return res.status(200).send({
                        success: true,
                        message: 'Book already exists'
                    });
                }
                var query = "INSERT INTO book_dataset VALUES (?,?,?,?,?,?,?,?,?,?)";
                var result = await pool.query(query, [title, author, 1.0, 0, "0", description, ISBN, genre, image, pagecount])
                return res.status(200).send({
                    success : true,
                    message : "Book Added"
                });
                // pool.query(query, ISBN, (err, result) => {
                //     if (err) throw err;
                //     if (result.length > 0){
                //         return res.status(200).send({
                //             success: true,
                //             message: 'Book already exists'
                //         });
                //     }
                //     else{
                //         let query = "INSERT INTO book_dataset VALUES (?,?,?,?,?,?,?,?,?,?)";
                //         pool.query(query, [title, author, 1.0, 0, "0", description, ISBN, genre, image, pagecount], (err, result) => {
                //             if (err) throw err;
                //             return res.status(200).send({
                //                 success : true,
                //                 message : "Book Added"
                //             })
                //         })
                //     }
                // })
            }
        }
        catch(err){
            return res.status(500).send(err);
        }
        
    },
    //---------------fetch reviews-------------//
    fetchReviews: async(req,res) =>{
        try{
            let  bookreviewID = req.body.id
            if (!bookreviewID){
                res.status(500).send('book not exist')
            }
            else{
                let query = "SELECT * FROM review WHERE bookid=?";
                var bookReview = await pool.query(query, bookreviewID)
                // console.log(bookReview)
                    return res.status(200).send({
                        bookReview :bookReview[0]
                    })
                } 
            } 
        catch{
            return res.status(500).send(err); 
        }
    },
    //----------------------------------------//
    removeBook: async (req,res) => {
        try{
            let {ISBN} = req.body;
            if (!ISBN){
                res.status(500).send('empty fields')
            }
            else {
                var query = "SELECT * FROM book_dataset WHERE ISBN = ?";
                var result = pool.query(query, ISBN)
                if (result[0].length == 0){
                    return res.status(200).send({
                        success: true,
                        message: 'Book does not exist'
                    });
                }

                var query = "DELETE FROM book_dataset WHERE ISBN = ?";
                var result = await pool.query(query, ISBN)
                return res.status(200).send({
                    success : true,
                    message : "Book Removed"
                });
                // pool.query(query, ISBN, (err, result) => {
                //     if (err) throw err;
                //     if (result.length == 0){
                //         return res.status(200).send({
                //             success: true,
                //             message: 'Book does not exist'
                //         });
                //     }
                //     else{
                //         let query = "DELETE FROM book_dataset WHERE ISBN = ?";
                //         pool.query(query, ISBN, (err, result) => {
                //             if (err) throw err;
                //             return res.status(200).send({
                //                 success : true,
                //                 message : "Book Removed"
                //             })
                //         })
                //     }
                // })
            }
        }
        catch(err){
            return res.status(500).send(err);    
        }
        
    },
    searchBookByTitle: async (req, res) => {
        try {
            let {booktitle} = req.body
            let query = "Select ISBN from book_dataset where title like CONCAT('%', ?, '%')";
            var result = await pool.query(query,booktitle)
            // res.status(200).send('success');
            return res.status(200).send({
                result : result[0],
                success: true
                });
        }
        catch(err) {
            return res.status(500).send(err);
        }
    },
    searchBookByGenre:  async (req, res) => {
        try {
            let {genre} = req.body
            let query = "Select ISBN from book_dataset where genre like CONCAT('%', ?, '%')";
            var result = await pool.query(query,genre)
            return res.status(200).send({
                result : result[0],
                success: true
                });
            }
            // res.status(200).send('success');
        
        catch(err) {
            
            return res.status(500).send(err);
        }
    },
    addTask:  async (req, res) => {
        try {
            let {userid,task} = req.body
            let query = "INSERT INTO tasklist(userid,task) VALUES (?,?)";
            var result = await pool.query(query,[userid,task])
            return res.status(200).send({
                tasklistid :result[0].insertId,
                success : true,
                message : "Task Added"
                });
            }
            // res.status(200).send('success');
        catch(err) {
            if (err.errno== 1452){
                return res.status(500).send("User does not exist")
            }
            return res.status(500).send(err);
        }
    },
    editTaskStatus:  async (req, res) => {
        try {
            let {userid,tasklistid,status} = req.body.todoComplete
            let query = "Update tasklist set status = ? where userid=? and tasklistid=?";
            await pool.query(query,[status,userid,tasklistid])
            return res.status(200).send({
                success : true,
                message : "Completed"
                });
            }
            // res.status(200).send('success');
        catch(err) {
            return res.status(500).send(err);
        }
    },
    deleteTask: async (req,res) => {
        try {
            let {tasklistid} = req.body
            console.log(tasklistid)
            await pool.query("DELETE from tasklist WHERE tasklistid=?",tasklistid);
            return res.status(200).send({
                success : true,
                message : "Task Deleted"
                });
        }
        catch(err) {
            return res.status(500).send(err);
        }
    },
    fetchTask:  async (req, res) => {
        try {
            let userid = req.body
            let query = "Select * from tasklist where userid=?";
            var result = await pool.query(query,userid)
            return res.status(200).send({
                result : result[0],
                success : true,
                message : "Success"
                });
            }
            // res.status(200).send('success');
        
        catch(err) {
            return res.status(500).send(err);
        }
    },
    postVote: async (req, res) => {
        try {
            let {reviewid, userid, vote} = req.body.voteInfo
            // if user has alredy voted
            var result = await pool.query("SELECT * from vote where userid=? and reviewid=?",[userid,reviewid])
            var user = await pool.query("SELECT userid FROM review WHERE reviewid=?",reviewid);
            const review_user = user[0][0].userid;
            if(result[0].length > 0){
                const existing_vote = result[0][0].vote;
                // delete vote if same vote again
                if (existing_vote == vote){
                    await pool.query("DELETE FROM vote WHERE userid=? and reviewid=?",[userid,reviewid]);
                    // update votes in review
                    await pool.query("UPDATE review SET votes=votes+? WHERE reviewid=?",[-vote,reviewid]);
                    // update points for user who posted the review
                    await pool.query("UPDATE user SET points=points+? WHERE userid=?",[-vote,review_user]);
                }
                else {
                    // update vote if user wants to change it
                    await pool.query("UPDATE vote SET vote=? WHERE reviewid=? and userid=?",[vote,reviewid,userid]);
                    if(vote == 1){
                        // change downvote to upvote
                        vote += 1
                    }
                    else {
                        // change upvote to downvote
                        vote -= 1
                    }
                    // Update vote
                    await pool.query("UPDATE review SET votes=votes+? WHERE reviewid=?",[vote,reviewid]);
                    // update points for user who posted the review
                    await pool.query("UPDATE user SET points=points+? WHERE userid=?",[vote,review_user]);
                    // check if user level has increased
                    var user_details = await pool.query("SELECT level,points FROM user WHERE userid=?",review_user);
                    const user_level = user_details[0][0].level;
                    const user_points = user_details[0][0].points;
                    if(user_level*50 == user_points || user_level*50 == user_points-1){
                        if (vote > 0){
                            await pool.query("UPDATE user SET level=level+1 WHERE userid=?",review_user)
                        }
                    }
                }
                return res.status(200).send("Vote updated")
            }
            // This user has not voted this review yet
            // Insert the vote
            await pool.query("INSERT INTO vote(reviewid,userid,vote) VALUES(?,?,?)",[reviewid,userid,vote])
            // update votes in review
            await pool.query("UPDATE review SET votes=votes+? WHERE reviewid=?",[vote,reviewid]);
            // update user points
            await pool.query("UPDATE user SET points=points+? WHERE userid=?",[vote,review_user]);var user_details = await pool.query("SELECT level,points FROM user WHERE userid=?",review_user);
            // Update user level
            const user_level = user_details[0][0].level;
            const user_points = user_details[0][0].points;
            if(user_level*50 == user_points || user_level*50 == user_points-1){
                if (vote > 0){
                    await pool.query("UPDATE user SET level=level+1 WHERE userid=?",review_user)
                }
            }
            return res.status(200).send({
                success: true
            });
        }
        catch(err) {
            return res.status(500).send(err)
        }
    },
    //---------------Library-------------//
    addToCart: async (req, res) =>{
        try { 
           
            let {ISBN, userid} = req.body;
            console.log(ISBN, userid)
            // check if item already exists
            // add to cart/shelf
            var result = await pool.query("INSERT INTO cart(userid,ISBN,readBook) VALUES(?,?,0)",[userid,ISBN]);
            return res.status(200).send({
                success: true
            });   
        }
        catch(err){
            return res.status(500).send(err)
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            let {userid,ISBN} = req.body
            // check if item exists
            
            // delete from cart
            await pool.query("DELETE from cart WHERE userid=? AND ISBN=?",[userid,ISBN]);
            return res.status(200).send({
                success: true,
                message: "Successfully deleted item"
            });   
        }
        catch(err){
            return res.status(500).send(err)
        }
    },
    getCartItems: async (req,res) => {
        try {
            // fetch all cart items
            let userid = req.body.userid;
            var result = await pool.query("SELECT cart.ISBN,cart.readBook,cart.userid,book_dataset.genre from cart join book_dataset on book_dataset.ISBN = cart.ISBN WHERE userid=?",userid);
            if (result[0].length == 0){
                return res.status(200).send({
                    success: false,
                    message: 'User has no books'
                });
            }
            return res.status(200).send({
                success: true,
                userShelf :result[0]
            });  
        }
        catch(err){
            return res.status(500).send(err)
        }
    },
    editBookStatus: async (req,res) => {
        try{
            let {userid,ISBN,readBook} = req.body
            await pool.query("Update cart set readBook=? WHERE userid=? AND ISBN=?",[readBook,userid,ISBN]);
            return res.status(200).send({
                success: true,
                message: "Status updated successfully"
            });  
        }
        catch(err){
            return res.status(500).send(err)
        }
    }
}
