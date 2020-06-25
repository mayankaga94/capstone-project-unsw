const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/login',(req,res)=>{
    res.send("Hello")
})