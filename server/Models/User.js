const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
        unique: true
    },
    Is_Verfied: {
        type: Boolean,
        default: false
    },
    Role: {
        type: String,
        enum: ['Worker', 'Buyer']
    },
    CNIC: {
        type: String
    },
    ProfilePhoto: {
        type: String,
    },
    CNIC_Front: {
        type: String
    },
    CNIC_Back: {
        type: String
    },
    Phone: {
        type: String
    },
    Password: {
        type: String
    },
    Age: {
        type: Number,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    Date: {
        type: Date,
        default: new Date
    },
})

const User = mongoose.model("User", userSchema)
module.exports = User