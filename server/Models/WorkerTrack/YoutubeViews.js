const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
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

const Transaction = mongoose.model("Transaction", TransactionSchema)
module.exports = Transaction