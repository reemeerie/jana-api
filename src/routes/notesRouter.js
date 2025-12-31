const express = require("express")
const router = express.Router()
const notesController = require("../controllers/notesController")
const adminAuthenticated = require("../middlewares/adminAuthMiddleware")
const {
  validateIdParam,
  validateCreateNote,
} = require("../middlewares/validationMiddleware")
const userAuthenticated = require("../middlewares/userAuthMiddleware")

router.get("/", adminAuthenticated, notesController.getNotes)
router.get(
  "/:id",
  adminAuthenticated,
  validateIdParam(),
  notesController.getNote
)
router.post(
  "/",
  userAuthenticated,
  validateCreateNote,
  notesController.createNote
)
router.patch(
  "/:id",
  userAuthenticated,
  validateIdParam(),
  notesController.editNote
)
router.delete(
  "/:id",
  userAuthenticated,
  validateIdParam(),
  notesController.deleteNote
)

module.exports = router
