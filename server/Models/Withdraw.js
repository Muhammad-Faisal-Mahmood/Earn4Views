const mongoose = require('mongoose');
const { Schema } = mongoose;

const WithdrawSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    WithdrawDate: {
        type: Date,
        default: new Date
    },
    Amount: {
        type: Number
    },
    Status: {
        type: String,
        enum: ["Pending", "Approved", "Declined"]
    },
    Approved_Date: {
        type: Date
    },
})

const WithdrawAccount = mongoose.model("Withdraw", WithdrawSchema)
module.exports = WithdrawAccount