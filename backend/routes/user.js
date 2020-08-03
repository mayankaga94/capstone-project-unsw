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
    .delete(userFunction.deleteReview)
    .put(userFunction.updateReview)

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

// -----------------------------------//
router.route('/searchbytitle',cors())
    .post(userFunction.searchBookByTitle)

// -------------------------------------//
router.route('/searchbygenre',cors())
    .post(userFunction.searchBookByGenre)

// -------------------------------------//
router.route('/user/task',cors())
    .post(userFunction.addTask)
    .put(userFunction.editTaskStatus)
    .delete(userFunction.deleteTask)

router.route('/fetchTask',cors())
    .put(userFunction.fetchTask)

//----------fetch all posts of book---------//
router.route('/fetchReviews', cors())
    .post(userFunction.fetchReviews)

//---------------- voting------------------//
router.route('/review/vote',cors())
    .post(userFunction.postVote)

//----------------User Library/Cart------------------//
router.route('/user/library',cors())
    // .get(userFunction.getCartItems)
    .post(userFunction.addToCart)
    .put(userFunction.editBookStatus)
    .delete(userFunction.deleteFromCart)
    //---------

router.route('/user/library/cart',cors())
.post(userFunction.getCartItems)


//----------------Delete a Review with all Votes------------------//
// router.route('/admin/deleteReview',cors())
//     .delete(userFunction.deleteReview)

//----------------Wishlist------------------//
router.route('/user/wishlist',cors())
    // .get(userFunction.fetchWishlist)
    .post(userFunction.addToWishlist)

router.route('/user/wishlistfetch',cors())
    .post(userFunction.fetchWishlist)

    
router.route('/user/wishlistName',cors())
    .post(userFunction.addWishlistName)


router.route('/user/wishlist/items',cors())
    .get(userFunction.fetchWishlistItems)
    .delete(userFunction.deleteFromWishlist)

router.route('/user/library/cart',cors())
.post(userFunction.getCartItems)

router.route('/fetchuserdetailswithvote',cors())
.get(userFunction.fetchuserdetailswithvote)

router.route('/totalreadbooks',cors())
.get(userFunction.totalreadbooks)

router.route('/getRecommendation',cors())
    .post(userFunction.getRecommendation)

router.route('/numberofreads',cors())
    .post(userFunction.numberofreads)

// router.route('/getRecommendedBooks')
//     .post(userFunction.getRecommendBooks)
//------------export all the routes------------//
module.exports = router