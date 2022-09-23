const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointments') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, appointmentController.getAppointments)

router.get('/create/:id', appointmentController.createAppointment)

router.post('/new', appointmentController.newAppointment)

router.get('/:id', appointmentController.showAppointment)

router.get('/:id/edit', appointmentController.editAppointment)

router.put('/:id/edit', appointmentController.updateAppointment)

router.delete('/:id/cancel', appointmentController.cancelAppointment)

module.exports = router