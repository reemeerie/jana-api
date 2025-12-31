const notesByUseridDriver = require("../db/notesByUserIdDriver")

const getNotesByUserid = async (id) => {
  const notes = await notesByUseridDriver.getNotesByUserid(id)

  return notes
}

module.exports = {
  getNotesByUserid,
}
