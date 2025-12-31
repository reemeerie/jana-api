const notesByUseridService = require("../services/notesByUseridService")

const getNotesByUserid = async (req, res, next) => {
  try {
    /* user es el decodedToken proporcionado por el userMiddleware */
    const notes = await notesByUseridService.getNotesByUserid(req.user.id)

    return res.json({ status: "OK", data: notes })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getNotesByUserid,
}
