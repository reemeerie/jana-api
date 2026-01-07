const { BadRequestError } = require("../errors/errors")

const validateNotePatch = (changes) => {
  const output = { ...changes }

  if (output.title !== undefined) {
    if (typeof output.title !== "string" || output.title === "")
      throw new BadRequestError(
        "Note title is invalid or empty"
      )
    output.title = output.title.trim()
  }

  if (output.content !== undefined) {
    if (typeof output.content !== "string" || output.content === "")
      throw new BadRequestError(
        "Note content is invalid or empty"
      )
    output.content = output.content.trim()
  }

  return output
}

module.exports = {
  validateNotePatch,
}
