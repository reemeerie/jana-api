const db = require('./db.js')

const getNotes = async () => {
    const [notes] = await db.query('SELECT * FROM notes')
    return notes
}
  
const getNote = async (id) => {
    const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [id])
    return note
}
  
const createNote = async (newNote) => {
    try {
        await db.query(
            'INSERT INTO notes (title, content, date, user_id) VALUES (?, ?, ?, ?)'
            , [newNote.title, newNote.content, newNote.date, newNote.user_id]
        )
    } catch {
        return `Eror: Couldnt create note`
    }

    return 'Note created succesfully'
}
  
const editNote = async (id, changes, user_id) => {
    const [noteExists] = await db.query('SELECT * FROM notes WHERE id = ?', [id])
    
    if (noteExists.length > 0 && noteExists[0].user_id === user_id) {
        await db.query('UPDATE notes SET title = IFNULL(?, title), content = IFNULL(?, content), date = IFNULL(?, date) WHERE id = ?',
        [changes.title, changes.content, changes.date, id])
        return 'Note edited'
    } else return 'Note doesnt exist or belongs to another user'
}
  
const deleteNote = async (id, user_id) => {
    const [noteExists] = await db.query('SELECT * FROM notes WHERE id = ?', [id])

    if (noteExists.length > 0 && noteExists[0].user_id === user_id) {
        await db.query('DELETE FROM notes WHERE id = ?', [id])
        return 'Note deleted'
    } else return 'Note doesnt exist or belongs to another user'
}
  
module.exports = {
    getNotes,
    getNote,
    createNote,
    editNote,
    deleteNote
}
