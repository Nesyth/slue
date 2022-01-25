const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    room: String,
    avatar: String,
    author: String,
    time: String,
    id: String,
    url: String
});

const msg = mongoose.model('message', schema);
module.exports = msg;