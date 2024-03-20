const mongoose = require('mongoose');
const { Schema } = mongoose;

const EarningSchema = new Schema({
    Channel: {
        type: String,
        enum: ["Youtube", "Google"]
    },
    Service: {
        type: String
    },
    Price: {
        type: Number
    },
})

const Earning = mongoose.model("Earning", EarningSchema)
module.exports = Earning