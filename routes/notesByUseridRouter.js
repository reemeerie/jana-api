const express = require('express')
const router = express.Router()
const notesByUseridController = require('../controllers/notesByUseridController')

router.get('/', notesByUseridController.getNotesByUserid)

module.exports = router