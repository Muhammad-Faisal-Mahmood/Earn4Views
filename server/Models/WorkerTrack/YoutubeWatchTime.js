const mongoose = require('mongoose');
const { Schema } = mongoose;

const YoutubeWatchTimeSchema = new Schema({
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

const YoutubeWatchTime = mongoose.model("YoutubeWatchTime", YoutubeWatchTimeSchema)
module.exports = YoutubeWatchTime