const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  patientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  providerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  diagnosis: {
    type: String,
  },
  procedure: {
    type: String,
  },
  patientSummary: {
    type: String,
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)