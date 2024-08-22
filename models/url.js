const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true
    } ,

    redirecturl : {
        type: String,
        required: true
    },

    visithistor: [{timestamp: {type: Number}}]
    },
    {timestamp: true}
)

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
