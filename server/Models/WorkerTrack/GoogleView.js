const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleViewSchema = new Schema({
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

const GoogleView = mongoose.model("GoogleView", GoogleViewSchema)
module.exports = GoogleView