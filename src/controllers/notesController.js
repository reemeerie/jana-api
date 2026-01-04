const notesService = require("../services/notesService")

/* El controller valida entrada y salida de datos,
que los campos requeridos estén presentes, tipado básico,
request bien formada, serializa y deserializa, status codes.
Las validaciones se movieron a un validationMiddleware para
dejar limpio el controller con las respuestas */

const getNotes = async (_req, res, next) => {
  try {
    const notes = await notesService.getNotes()

    return res.json({ status: "OK", data: notes })
  } catch (err) {
    next(err)
  }
}

const getNote = async (req, res, next) => {
  try {
    const id = req.params.id
    const note = await notesService.getNote(id)

    return res.json({ status: "OK", data: note })
  } catch (err) {
    next(err)
  }
}

const createNote = async (req, res, next) => {
  try {
    const note = {
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      user_id: req.user.id,
    }
    const createdNote = await notesService.createNote(note)

    return res.status(201).json({ status: "OK", data: createdNote })
  } catch (err) {
    next(err)
  }
}

const editNote = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    const noteToEdit = {
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
    }
    const editedNote = await notesService.editNote(id, noteToEdit, userId)

    return res.json({ status: "OK", data: editedNote })
  } catch (err) {
    next(err)
  }
}

const deleteNote = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    const deletedNote = await notesService.deleteNote(id, userId)

    return res.status(204).json({ status: "OK", data: deletedNote })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote,
}
