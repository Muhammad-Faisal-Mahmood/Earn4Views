const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkerWatchTimeTrackSchema = new Schema({
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
    },
    WatchTimeCount:{
        type: Number,
        required: true
    }
})

const WorkerWatchTimeTrack = mongoose.model("WorkerWatchTimeTrack", WorkerWatchTimeTrackSchema)
module.exports = WorkerWatchTimeTrack