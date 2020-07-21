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
// --------Get details of a specific book -----//

router.route('/book')
    .post(userFunction.book)
// ----------for fetching all the books--------//
router.route('/booksFetch')
    .get(userFunction.booksFetch)

//------------export all the routes------------//
module.exports = router