const notesDriver = require("../db/notesDriver")
const { NotFoundError, ForbiddenError } = require("../errors/errors")
const { validateNotePatch } = require("../utils/validateNotes")

/* El service se encarga de checkear que exista el usuario en la DB 
y de hashear la contraseña, eso no es responsabilidad del controller ni del driver u ORM.
Se encarga de las reglas de negocio, como validar si la contrasenia es fuerte o debil,
que el email sea válido, lowercasearlo. Lanza errores de dominio, no status codes, y orquesta drivers/repos/ORMs */

const getNotes = async () => {
  const notes = await notesDriver.getNotes()
  if (!notes) throw new NotFoundError("No se encontraron notas")

  return notes
}

const getNote = async (id) => {
  const note = await notesDriver.getNote(id)
  if (!note) throw new NotFoundError("Nota no encontrada")

  return note
}

const createNote = async (newNote) => {
  const insertId = await notesDriver.createNote(newNote)
  const createdNote = await notesDriver.getNote(insertId)

  return createdNote
}

const editNote = async (id, changes, userId) => {
  const note = await notesDriver.getNote(id)
  if (!note) throw new NotFoundError("Nota no encontrada")

  if (note.user_id !== userId) {
    throw new ForbiddenError("No podes editar esta nota")
  }

  const toUpdate = validateNotePatch(changes)

  await notesDriver.editNote(id, toUpdate)

  const editedNote = await notesDriver.getNote(id)

  return editedNote
}

const deleteNote = async (id, userId) => {
  const note = await notesDriver.getNote(id)
  if (!note) throw new NotFoundError("Nota no encontrada")

  if (note.user_id !== userId) {
    throw new ForbiddenError("No podes eliminar esta nota")
  }

  const deletedNote = await notesDriver.deleteNote(id)
  return deletedNote
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote,
}
