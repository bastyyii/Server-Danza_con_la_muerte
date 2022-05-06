const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        Unique: true
    },
    bookingMonth: {
        type: String,
        require: true,
        trim: true
    },
    bookingDay: {
        type: String,
        require: true,
        trim: true
    },
    bookingYear: {
        type: String,
        require: true,
        trim: true
    },
    bookingHours: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);