let mongoose = require('mongoose');

let replySchema = new mongoose.Schema({
    text: {type:String, default:''},
    created_on: {type:Date, default: Date.now()},
    delete_password: { type:String, default: ''},
    reported: {type:Boolean, default: false}
});

module.exports = mongoose.model('Reply',replySchema);