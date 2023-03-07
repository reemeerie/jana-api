const notesByUseridOrm = require('../db/notesByUseridOrm')

const getNotesByUserid = async (id) => {
  const notes = await notesByUseridOrm.getNotesByUserid(id)
  return notes
}

module.exports = {
  getNotesByUserid
}