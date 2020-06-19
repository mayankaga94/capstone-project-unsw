const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: String,
    collections: [String],
    password: {
        type: String,
        required:true
    }
    // Add collections ratings reviews. add book, reviews, .... collections.
})