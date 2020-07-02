const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql");
const app = express();

// DB config
const db = require('./config/keys').MongoURI

// Connect to mongo atlas
// ! Disconnected(Connection issue) to resolve !!
// mongoose.connect(db,{useNewUrlParser: true})
//     .then(() => console.log('MongoDb Connected....'))
//     .catch(err => console.log(err));

// body-parser
app.use(express.urlencoded({extended:false}));

// Routes
app.get('/',(req,res) => {
    res.send("Welcome")
});

app.use('/user',require('./routes/user'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
