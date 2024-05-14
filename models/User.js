const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  IDScan: { type: Number, unique: true },
  email: String,
  phone: Number,
  password: String,
  status: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  }
})

module.exports = mongoose.model('User', UserSchema)