const { BadRequestError } = require("../errors/errors")

const validateNotePatch = (changes) => {
  const output = { ...changes }

  if (output.title !== undefined) {
    if (typeof output.title !== "string" || output.title === "")
      throw new BadRequestError(
        "El titulo de la nota no puede estar vacío o es invalido"
      )
    output.title = output.title.trim()
  }

  if (output.content !== undefined) {
    if (typeof output.content !== "string" || output.content === "")
      throw new BadRequestError(
        "El contenido de la nota no puede estar vacío o es invalido"
      )
    output.content = output.content.trim()
  }

  if (output.date !== undefined) {
    if (typeof output.date !== "string" || output.date === "") {
      throw new BadRequestError(
        "La fecha de la nota no puede estar vacía o es invalida"
      )
    }
    output.date = output.date.trim()
  }

  return output
}

module.exports = {
  validateNotePatch,
}
