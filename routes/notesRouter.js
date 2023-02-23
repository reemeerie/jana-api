const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.get('/', notesController.getNotes)
router.get('/:id', notesController.getNote)
router.post('/', notesController.createNote)
router.patch('/:id', notesController.editNote)
router.delete('/:id', notesController.deleteNote)

module.exports = router
