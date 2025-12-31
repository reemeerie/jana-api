const db = require("./db.js")

const getUsers = async () => {
  const [users] = await db.query("SELECT * FROM users")

  return users
}

const getUser = async (id) => {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id])
  
  return user[0]
}

const getUserByEmail = async (email) => {
  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email])

  return user[0]
}

const createUser = async (user) => {
  const [createdUser] = await db.query(
    "INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.password, false]
  )

  return createdUser[0]
}

const editUser = async (id, changes) => {
  /* Hacemos dos arrays de strings, uno para clave y otro para valor */
  const fields = []
  const values = []

  /* Esto no es validar los campos, es construir una query dinamica
  es logica de persistencia, no de negocio. Es mapear datos a SQL y ejecutar */
  if (changes.name !== undefined) {
    fields.push("name = ?")
    values.push(changes.name)
  }
  if (changes.email !== undefined) {
    fields.push("email = ?")
    values.push(changes.email)
  }
  if (changes.password !== undefined) {
    fields.push("password = ?")
    values.push(changes.password)
  }

  if (fields.length === 0) return

  /* La query tiene 4 ?, la ultima es el ID */
  values.push(id)

  const [result] = await db.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values
  )

  return result
}

const deleteUser = async (id) => {
  const [userDeleted] = await db.query("DELETE FROM users WHERE id = ?", [id])

  return userDeleted
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  editUser,
  deleteUser,
}
