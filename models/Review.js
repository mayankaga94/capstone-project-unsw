const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user : {
        type: Number,
        required: true
    },
    book : {
        type: Number,
        required: true
    },
    comment : {
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review',ReviewSchema);
module.exports = Review;