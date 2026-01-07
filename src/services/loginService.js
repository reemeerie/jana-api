const usersDriver = require("../db/usersDriver")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../errors/errors")

const login = async (loggingUser) => {
  const user = await usersDriver.getUserByEmail(loggingUser.email)
  if (!user) throw new UnauthorizedError("Invalid user or password")

  const passwordCorrect = await bcrypt.compare(loggingUser.password, user.password)

  if (!passwordCorrect) {
    throw new UnauthorizedError("Invalid user or password")
  }

  const userToken = {
    id: user.id,
    admin: user.admin,
  }

  const token = jwt.sign(userToken, process.env.SECRET/* , { expiresIn: "1h" } */)

  return token
}

module.exports = { login }
