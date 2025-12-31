const express = require("express")
const router = express.Router()
const notesByUseridController = require("../controllers/notesByUseridController")
const userAuthenticated = require("../middlewares/userAuthMiddleware")

router.get("/", userAuthenticated, notesByUseridController.getNotesByUserid)

module.exports = router
