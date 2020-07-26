const express = require('express');
const router = express.Router();
const cors  = require('cors')
const userFunction = require('../routesFunctions/functions')
const verify =  require('./verifytoken')
require("dotenv").config();
// ---------------Registration ----------------//

router.route('/register',cors())
    .post(userFunction.register)

//---------------Login ------------------------//
router.route('/logIn',cors())
    .post(userFunction.logIn)

//-------------Login Success ------------------//
router.route('/authentication')
    .post(userFunction.logIn)

 //-------- login to homepage------------------//

router.route('/homepage')
    .get(verify, userFunction.homepage)



// -------------get detials of the user -------//
router.route('/getUser')
.get(verify,userFunction.userDetails)

// ---------------------------------------------//

// --------Get details of a specific book -----//

router.route('/book')
    .post(userFunction.book)

// ----------for fetching all the books--------//
router.route('/booksFetch')
    .get(userFunction.booksFetch)

// Posting a review
router.route('/book/review')
    .post(userFunction.postReview)

// Posting a rating
router.route('/book/rating')
    .post(userFunction.postRating)


// ---------------Admin Registration ----------------//

router.route('/admin/register',cors())
    .post(userFunction.adminRegister)

//---------------Admin Login ------------------------//
router.route('/admin/login',cors())
    .post(userFunction.adminLogin)


//---------------Admin Add Book ------------------------//
router.route('/admin/addBook',cors())
    .post(userFunction.addBook)

//---------------Admin Remove Book ------------------------//
router.route('/admin/removeBook',cors())
    .post(userFunction.removeBook)

router.route('/searchbytitle',cors())
    .get(userFunction.searchBookByTitle)

router.route('/searchbygenre',cors())
    .get(userFunction.searchBookByGenre)

router.route('/addtask',cors())
    .post(userFunction.AddTask)


router.route('/editTaskStatus',cors())
    .post(userFunction.editTaskStatus)

router.route('/fetchTask',cors())
    .get(userFunction.fetchTask)


//----------fetch all posts of book---------//

router.route('/fetchReviews', cors())
    .post(userFunction.fetchReviews)


//-----------------------------------------//
// voting
router.route('/review/vote',cors())
    .post(userFunction.postVote)
//------------export all the routes------------//
module.exports = router