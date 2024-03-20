const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkerAccountSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    BankAccount: {
        type: String
    },
    Account_No: {
        type: String
    },
    Account_Title: {
        type: String
    },
})

const WorkerAccount = mongoose.model("WorkerAccount", WorkerAccountSchema)
module.exports = WorkerAccount