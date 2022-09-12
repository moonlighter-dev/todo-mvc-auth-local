const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  patientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  providerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  diagnosis: {
    type: String,
    required: true
  },
  procedure: {
    type: String,
    required: true
  },
  patientSummary: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)