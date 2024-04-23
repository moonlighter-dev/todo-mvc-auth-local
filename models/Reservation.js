const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
  outDate: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },
  notes: {
    type: String,
  },
  inDate: {
    type: String,
  },
})

module.exports = mongoose.model('Reservation', ReservationSchema)