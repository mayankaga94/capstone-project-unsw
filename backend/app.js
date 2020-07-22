const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

// DB config
const db = require('./config/keys').MongoURI

// Connect to mongo atlas
mongoose.connect(db,{useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected....'))
    .catch(err => console.log(err));

//-------------------------------middlewares---------------------------------//

app.use(bodyParser.json())



//-------------------------------routes--------------------------------------//

app.use('/',require('./routes/user'))

//------------------------ starting the server ------------------------------//

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log(`Server started on port ${PORT}`);

// --------------------------------END--------------------------------------//