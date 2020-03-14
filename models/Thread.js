let mongoose = require('mongoose');

let threadSchema = new mongoose.Schema({
    text: String, 
    created_on: {type: Date, default: Date.now()}, 
    bumped_on: { type: Date, default: Date.now() },
    reported: Boolean, 
    delete_password: String, 
    replies: Array
})

module.exports = mongoose.model('Thread',threadSchema);