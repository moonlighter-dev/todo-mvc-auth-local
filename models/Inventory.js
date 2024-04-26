const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
  scan: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Inventory', InventorySchema)
