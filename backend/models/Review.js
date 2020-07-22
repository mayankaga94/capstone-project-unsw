const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userid : {
        type: Number,
        required: true
    },
    bookid : {
        type: Number,
        required: true
    },
    comment : {
        type: String,
        required: true
    },
    votes : {
        type: Number
    }
});

const Review = mongoose.model('Review',ReviewSchema);
module.exports = Review;