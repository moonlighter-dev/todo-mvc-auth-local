const express = require('express')
const router = express.Router()
const providerController = require('../controllers/provider') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, providerController.getDashboard)

router.post('/:id/new', providerController.newPatient)

router.put('/:id/edit', providerController.editPatient)

router.post('/:id/newapp', providerController.newAppointment)

router.put('/:id/:appid/edit', providerController.editAppointment)

router.delete('/:id/:appid/cancel', providerController.cancelAppointment)

module.exports = router