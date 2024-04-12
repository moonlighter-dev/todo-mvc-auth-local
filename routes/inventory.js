const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, inventoryController.getInventory)

router.get('/newInventory', inventoryController.newInventory)

router.post('/createinventory', inventoryController.createInventory)

router.get('/editInventory', inventoryController.editInventory)

router.put('/updateInventory', inventoryController.updateInventory)

router.delete('/deleteinventory', inventoryController.deleteInventory)

module.exports = router