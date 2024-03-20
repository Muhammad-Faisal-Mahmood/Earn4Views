const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({
    Channel: {
        type: String,
        enum: ["Youtube", "Google", "TikTok", "Instagram", "Facebook"]
    },
    Service: {
        type: String
    },
    Price: {
        type: Number
    },
})

const Plan = mongoose.model("Plan", PlanSchema)
module.exports = Plan