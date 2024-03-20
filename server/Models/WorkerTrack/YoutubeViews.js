const mongoose = require('mongoose');
const { Schema } = mongoose;

const YoutubeViewSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    IP_Address: {
        type: String,
        required: true
    }
})

const YoutubeView = mongoose.model("YoutubeView", YoutubeViewSchema)
module.exports = YoutubeView