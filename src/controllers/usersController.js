const usersService = require("../services/usersService")

/* El controller valida entrada y salida de datos,
que los campos requeridos estén presentes, tipado básico,
request bien formada, serializa y deserializa, status codes.
Las validaciones se movieron a un validationMiddleware para
dejar limpio el controller con las respuestas */

const getUsers = async (_req, res, next) => {
  try {
    const users = await usersService.getUsers()

    return res.json({ status: "OK", data: users })
  } catch (err) {
    next(err)
  }
}

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await usersService.getUser(id)

    return res.json({ status: "OK", data: user })
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    const createdUser = await usersService.createUser(user)

    return res.status(201).json({ status: "OK", data: createdUser })
  } catch (err) {
    next(err)
  }
}

const editUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id
    const editedUser = await usersService.editUserByAdmin(id, req.body)

    return res.json({ status: "OK", data: editedUser })
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedUser = await usersService.deleteUser(id)

    return res.status(410).json({ status: "OK", data: deletedUser })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  editUserByAdmin,
  deleteUser,
}
