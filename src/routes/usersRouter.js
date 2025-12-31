const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")
const adminAuthenticated = require("../middlewares/adminAuthMiddleware")
const {
  validateCreateUser,
  validateIdParam,
} = require("../middlewares/validationMiddleware")

router.get("/", adminAuthenticated, usersController.getUsers)
router.get(
  "/:id",
  adminAuthenticated,
  validateIdParam(),
  usersController.getUser
)
router.post("/", validateCreateUser, usersController.createUser)
router.patch(
  "/:id",
  adminAuthenticated,
  validateIdParam(),
  usersController.editUserByAdmin
)
router.delete(
  "/:id",
  adminAuthenticated,
  validateIdParam(),
  usersController.deleteUser
)

module.exports = router
