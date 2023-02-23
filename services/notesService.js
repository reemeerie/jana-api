const notesOrm = require('../db/notesOrm')

const getNotes = async () => {
  const notes = await notesOrm.getNotes()
  return notes
}

const getNote = async (id) => {
    const note = await notesOrm.getNote(id)
    return note
}

const createNote = async (newNote) => {
    const createdNote = await notesOrm.createNote(newNote)
    return createdNote
}

const editNote = async (id, changes, user_id) => {
    const editedNote = await notesOrm.editNote(id, changes, user_id)
    return editedNote
}

const deleteNote = async (id, user_id) => {
    const deletedNote = await notesOrm.deleteNote(id, user_id)
    return deletedNote
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote
}