const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, patientController.getDashboard)

router.post('/:id/new', patientController.newAppointment)

router.put('/:id/edit', patientController.editPatient)

router.put('/:id/:appid/edit', patientController.editAppointment)

router.delete('/:id/:appid/cancel', patientController.cancelAppointment)

module.exports = router