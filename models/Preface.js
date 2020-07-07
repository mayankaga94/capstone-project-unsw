const mongoose = require('mongoose');

const PrefaceSchema = new mongoose.Schema({
    book : {
        type: Number,
        required: true
    },
    content : {
        type: String
    }
});

const Preface = mongoose.model('Preface',PrefaceSchema);
module.exports = Preface;