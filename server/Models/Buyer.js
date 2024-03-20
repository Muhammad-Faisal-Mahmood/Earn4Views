const mongoose = require('mongoose');
const { Schema } = mongoose;

const BuyerSchema = new Schema({
    User_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Funds:{
        type: Number
    }
})

const Buyer = mongoose.model("Buyer", BuyerSchema)
module.exports = Buyer