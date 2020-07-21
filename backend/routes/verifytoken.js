const jwt = require('jsonwebtoken')

module.exports = function (req,res, next ){

    const token = req.header('auth_token')
    if(!token ){
        res.status("401").send("dont try to act smart");
    }
    try{
         const verified = jwt.verify(token, process.env.SECRET_KEY)
         req.user = verified
         next()
    }
    catch{ 
        res.status(400).send("invalid token")
    }
}