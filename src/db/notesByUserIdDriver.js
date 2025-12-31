const db = require("./db.js")

/* El driver no valida, solo ejecuta la query a la DB */

const getNotesByUserid = async (id) => {
  const [notes] = await db.query("SELECT * FROM notes WHERE user_id = ?", [id])
  
  return notes
}

module.exports = {
  getNotesByUserid,
}
