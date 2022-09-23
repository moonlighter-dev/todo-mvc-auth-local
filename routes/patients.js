const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patients') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, patientController.getPatients)

//no post method because patients are added using the Signup route and selecting "patient" (which is default) as their status.

router.get('/:id', patientController.showPatient)

router.get('/:id/edit', patientController.editPatient)

router.put('/:id/edit', patientController.updatePatient)

router.delete('/:id/delete', patientController.deletePatient)

module.exports = router