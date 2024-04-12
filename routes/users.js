const express = require('express')
const router = express.Router()
const userController = require('../controllers/users') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, userController.getUsers)

router.get('/:id', userController.showUser)

router.get('/:id/edit', userController.editUser)

router.put('/:id/edit', userController.updateUser)

router.delete('/:id/delete', userController.deleteUser)

module.exports = router