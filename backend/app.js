const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//-------------------------------middlewares---------------------------------//

app.use(bodyParser.json())



//-------------------------------routes--------------------------------------//

app.use('/',require('./routes/user'))

//------------------------ starting the server ------------------------------//

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log(`Server started on port ${PORT}`);

// --------------------------------END--------------------------------------//