const { BadRequestError } = require("../errors/errors")

/* Hay 2 tipos de validacion: validacion de input (controllers) y validacion de negocio (services)
Las de negocio quedan en service, las de input estan aca, cosa de que el controller quede limpio con responses */

const validateIdParam =
  (paramName = "id") =>
  /* Parametro opcional por si necesito validar otros idParams */
  /* No olvidar instanciarlo con () */
  (req, _res, next) => {
    const id = Number(req.params[paramName])

    /* Si me da un float o un negativo lo reboto */
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError(`El ${paramName.toUpperCase()} es invalido`)
    }

    req.params[paramName] = id // Lo dejo ya numberizado

    next()
  }

const validateCreateUser = (req, _res, next) => {
  const { name, email, password, password2 } = req.body

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof password2 !== "string"
  ) {
    throw new BadRequestError("Campos invalidos")
  }

  if (!name.trim() || !email.trim() || !password || !password2) {
    throw new BadRequestError("Faltan campos")
  }

  if (password !== password2) {
    throw new BadRequestError("Las contraseñas no coinciden")
  }

  /* Si se normaliza segun un tenant, deberia hacerse en el service */
  req.body.name = name.trim()
  req.body.email = email.trim().toLowerCase()

  next()
}

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Faltan campos")
  }

  next()
}

const validateCreateNote = (req, _res, next) => {
  const { title, content, date } = req.body

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof date !== "string"
  ) {
    throw new BadRequestError("Campos invalidos")
  }

  if (!title || !date || !content) {
    throw new BadRequestError("Faltan campos")
  }

  req.body.title = title.trim()
  req.body.content = content.trim()
  req.body.date = date.trim()

  next()
}

module.exports = {
  validateIdParam,
  validateCreateUser,
  validateLogin,
  validateCreateNote,
}
