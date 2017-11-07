const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

var videoSchema = new Schema({
    title: String,
    _url: String,
    description: String
});

module.exports = mongoose.model('video', videoSchema, 'videos')
