const db = require('./db.js')

const getNotesByUserid = async (id) => {
    if (id) {
        const [notes] = await db.query('SELECT * FROM notes WHERE user_id = ?', [id])
        return notes
    } else return 
}

module.exports = {
    getNotesByUserid
}