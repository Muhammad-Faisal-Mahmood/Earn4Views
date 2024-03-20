const mongoose = require('mongoose');
const { Schema } = mongoose;

const YoutubeSubscriberSchema = new Schema({
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

const YoutubeSubscriber = mongoose.model("YoutubeSubscriber", YoutubeSubscriberSchema)
module.exports = YoutubeSubscriber