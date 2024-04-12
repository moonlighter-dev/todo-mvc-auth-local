const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservations') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, reservationController.getReservations)

router.get('/create/:id', reservationController.createReservation)

router.post('/new', reservationController.newReservation)

router.get('/:id', reservationController.showreservation)

router.get('/:id/edit', reservationController.editreservation)

router.put('/:id/edit', reservationController.updatereservation)

router.delete('/:id/cancel', reservationController.cancelreservation)

module.exports = router