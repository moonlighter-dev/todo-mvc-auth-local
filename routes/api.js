const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory') 
const reservationsController = require('../controllers/reservations')
const usersController = require('../controllers/users')

//User Endpoints
router.get('/api/users', usersController.getUsers)
router.get('/api/users/:id', usersController.getUser)
router.post('/api/users/new', usersController.addUser)
router.put('/api/users/edit/:id', usersController.updateUser)
router.delete('/api/users/delete/:id', usersController.deleteUser)

// //Inventory Endpoints
router.get('/api/inventory', inventoryController.getInventory)
router.get('/api/inventory/:id', inventoryController.getItem)
router.post('/api/inventory/new', inventoryController.addItem)
router.put('/api/inventory/edit/:id', inventoryController.updateItem)
router.delete('/api/inventory/delete/:id', inventoryController.deleteItem)

// //Reservation Endpoints
router.get('/api/reservations', reservationsController.getReservations)
router.get('/api/reservations/:id', reservationsController.getReservation)
router.post('/api/reservations/new', reservationsController.addReservation)
router.put('/api/reservations/edit/:id', reservationsController.updateReservation)
router.delete('/api/reservations/delete/:id', reservationsController.deleteReservation)

module.exports = router