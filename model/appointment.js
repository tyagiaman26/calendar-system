const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    appointmentDate: {
        type: Date
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Appoinment', appointmentSchema);