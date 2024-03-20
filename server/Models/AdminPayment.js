const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminPaymentSchema = new Schema({
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

const AdminAccount = mongoose.model("AdminAccount", AdminPaymentSchema)
module.exports = AdminAccount