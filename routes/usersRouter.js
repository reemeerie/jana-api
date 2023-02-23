const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)
router.post('/', usersController.createUser)
router.patch('/:id', usersController.editUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router
