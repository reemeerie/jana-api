const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const isAuthenticated = require("../middlewares/authMiddleware")

router.get('/', isAuthenticated, usersController.getUsers)
router.get('/:id', isAuthenticated, usersController.getUser)
router.post('/', usersController.createUser)
router.patch('/:id', usersController.editUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router
