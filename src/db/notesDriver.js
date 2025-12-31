const db = require("./db.js")

const getNotes = async () => {
  const [notes] = await db.query("SELECT * FROM notes")

  return notes
}

const getNote = async (id) => {
  const [note] = await db.query("SELECT * FROM notes WHERE id = ?", [id])

  return note[0]
}

const createNote = async (newNote) => {
  const [createdNote] = await db.query(
    "INSERT INTO notes (title, content, date, user_id) VALUES (?, ?, ?, ?)",
    [newNote.title, newNote.content, newNote.date, newNote.user_id]
  )

  return createdNote
}

const editNote = async (id, changes) => {
  /* Hacemos dos arrays de strings, uno para clave y otro para valor */
  const fields = []
  const values = []

  /* Esto no es validar los campos, es construir una query dinamica
  es logica de persistencia, no de negocio. Es mapear datos a SQL y ejecutar */
  if (changes.title !== undefined) {
    fields.push("title = ?")
    values.push(changes.title)
  }
  if (changes.content !== undefined) {
    fields.push("content = ?")
    values.push(changes.content)
  }
  if (changes.date !== undefined) {
    fields.push("date = ?")
    values.push(changes.date)
  }

  if (fields.length === 0) return
  
  /* La query tiene 4 ?, la ultima es el ID */
  values.push(id)

  const [result] = await db.query(
    `UPDATE notes SET ${fields.join(", ")} WHERE id = ?`,
    values
  )

  return result[0]
}

const deleteNote = async (id) => {
  const [deletedNote] = await db.query("DELETE FROM notes WHERE id = ?", [id])

  return deletedNote
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote,
}
