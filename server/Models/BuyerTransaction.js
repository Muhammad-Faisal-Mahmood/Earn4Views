const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    TID: {
        type: String
    },
    Status: {
        type: String,
        enum: ["Pending", "Approved", "Declined"]
    },
    Amount: {
        type: Number
    },
    Date: {
        type: Date,
        default: new Date
    },
})

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports = Transaction