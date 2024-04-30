const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/auth') 
const reservationsController = require('../controllers/home')
const usersController = require('../controller/users')
const ensureAuth = require('../middleware/auth')

//User Endpoints
router.get('/api/users', ensureAuth, usersController.getUsers)
router.get('/api/users/:id', ensureAuth, usersController.getUser)
router.post('/api/users/new', usersController.addUser)
router.put('/api/users/edit/:id', ensureAuth, usersController.updateUser)
router.delete('/api/users/delete/:id', ensureAuth, usersController.deleteUser)

//Inventory Endpoints
router.get('/api/inventory', inventoryController.getInventory)
router.get('/api/inventory/:id', inventoryController.getItem)
router.post('/api/inventory/new', inventoryController.addItem)
router.put('/api/inventory/edit/:id', ensureAuth, inventoryController.updateItem)
router.delete('/api/inventory/delete/:id', ensureAuth, inventoryController.deleteItem)

//Reservation Endpoints
router.get('/api/reservations', reservationsController.getReservations)
router.get('/api/reservations/:id', reservationsController.getReservation)
router.post('/api/reservations/new', reservationsController.addReservation)
router.put('/api/reservations/edit/:id', reservationsController.updateReservation)
router.delete('/api/reservations/delete/:id', ensureAuth, reservationsController.deleteReservation)

module.exports = router