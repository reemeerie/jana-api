const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const isAuthenticated = require("../middlewares/authMiddleware")

router.get('/', isAuthenticated,notesController.getNotes)
router.get('/:id', isAuthenticated, notesController.getNote)
router.post('/', notesController.createNote)
router.patch('/:id', notesController.editNote)
router.delete('/:id', notesController.deleteNote)

module.exports = router
