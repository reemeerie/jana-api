const { BadRequestError } = require("../errors/errors")

const normalizeEmail = (email) => email.trim().toLowerCase()

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isStrongPassword = (password) => {
  // 5+ caracteres, 1 mayúscula, 2 números
  return (
    typeof password === "string" &&
    password.length >= 5 &&
    /[A-Z]/.test(password) &&
    (password.match(/[0-9]/g) || []).length >= 2
  )
}

/* Para editar - campos opcionales, pero si vienen deben ser válidos */
const validateUserPatch = (changes) => {
  const output = { ...changes }

  if (output.email !== undefined) {
    if (typeof output.email !== "string")
      throw new BadRequestError("Invalid email")
    output.email = normalizeEmail(output.email)
    if (output.email === "") throw new BadRequestError("Invalid email")
    if (!isValidEmail(output.email)) throw new BadRequestError("Invalid email")
  }

  if (output.name !== undefined) {
    if (typeof output.name !== "string" || output.name === "")
      throw new BadRequestError("Invalid name")
    output.name = output.name.trim()
  }

  if (output.password !== undefined) {
    if (!isStrongPassword(output.password)) {
      throw new BadRequestError(
        "Weak password: min 5 chars, 1 uppercase, 2 numbers"
      )
    }
  }

  return output
}

module.exports = {
  validateUserPatch,
  isValidEmail,
  isStrongPassword,
}
