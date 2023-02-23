const usersOrm = require('../db/usersOrm')

const getUsers = async () => {
  const users = await usersOrm.getUsers()
  return users
}

const getUser = async (id) => {
    const user = await usersOrm.getUser(id)
    return user
}

const createUser = async (newUser) => {
    const createdUser = await usersOrm.createUser(newUser)
    return createdUser
}

const editUser = async (id, changes, user_id) => {
    const editedUser = await usersOrm.editUser(id, changes, user_id)
    return editedUser
}

const deleteUser = async (id, user_id) => {
    const deletedUser = await usersOrm.deleteUser(id, user_id)
    return deletedUser
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser
}