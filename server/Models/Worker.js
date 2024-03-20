const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkerSchema = new Schema({
    User_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Earning:{
        type: Number
    }
})

const Worker = mongoose.model("Worker", WorkerSchema)
module.exports = Worker