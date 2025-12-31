const usersDriver = require("../db/usersDriver")
const bcrypt = require("bcrypt")
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../errors/errors")
const {
  validateUserPatch,
  isValidEmail,
  isStrongPassword,
} = require("../utils/validateUsers")

/* El service se encarga de checkear que exista el usuario en la DB 
y de hashear la contraseña, eso no es responsabilidad del controller ni del driver u ORM.
Se encarga de las reglas de negocio, como validar si la contrasenia es fuerte o debil,
que el email sea válido, lowercasearlo. Lanza errores de dominio, no status codes, y orquesta drivers/repos/ORMs */

const getUsers = async () => {
  const users = await usersDriver.getUsers()
  if (!users) throw new NotFoundError("No se encontraron usuarios")

  return users
}

const getUser = async (id) => {
  const user = await usersDriver.getUser(id)
  if (!user) throw new NotFoundError("Usuario no encontrado")

  return user
}

const createUser = async (newUser) => {
  if (!isValidEmail(newUser.email))
    throw new BadRequestError("El email es invalido")

  if (!isStrongPassword(newUser.password)) {
    throw new BadRequestError(
      "La contraseña es muy débil: mínimo 5 caracteres, 1 mayúscula, 2 numeros"
    )
  }

  const user = await usersDriver.getUserByEmail(newUser.email)
  if (user) throw new ConflictError("Ya existe un usuario con ese email")

  newUser.password = await bcrypt.hash(newUser.password, 10)

  const createdUser = await usersDriver.createUser(newUser)
  return createdUser
}

const editUserByAdmin = async (id, changes) => {
  const user = await usersDriver.getUser(id)
  if (!user) throw new NotFoundError("Usuario no encontrado")

  const toUpdate = validateUserPatch(changes)

  if (toUpdate.password !== undefined) {
    /* Si quiero cambiar la pass, hasheo de nuevo */
    toUpdate.password = await bcrypt.hash(toUpdate.password, 10)
  }

  const editedUser = await usersDriver.editUser(id, toUpdate)
  return editedUser
}

const deleteUser = async (id) => {
  const user = await usersDriver.getUser(id)
  if (!user) throw new NotFoundError("Usuario no encontrado")

  const deletedUser = await usersDriver.deleteUser(id)
  return deletedUser
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  editUserByAdmin,
  deleteUser,
}

/* Se puede implementar un editMe a futuro */
/* const editMe = async (targetUserId, requesterUserId, changes, isAdmin) => {
  if (!isAdmin && targetUserId !== requesterUserId) {
    throw new ForbiddenError("You can't edit another user")
  }
  return editUserByAdmin(targetUserId, changes)
} */
