const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
