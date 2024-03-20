const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Channel: {
        type: String,
        enum: ["Youtube", "Google", "TikTok", "Instagram", "Facebook"]
    },
    Service: {
        type: String
    },
    Amount: {
        type: Number
    },
    URL: {
        type: String
    },
    Total: {
        type: Number
    },
    Date: {
        type: Date,
        default: new Date
    },
    Status: {
        type: String,
        enum: ["Pending", "Approved", "Declined", "Completed"]
    }
})

const Service = mongoose.model("Service", ServiceSchema)
module.exports = Service