const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkerTrackSchema = new Schema({
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

const WorkerTrack = mongoose.model("WorkerTrack", WorkerTrackSchema)
module.exports = WorkerTrack