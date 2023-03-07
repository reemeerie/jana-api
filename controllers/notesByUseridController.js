const notesByUseridService = require("../services/notesByUseridService")
const jwt = require('jsonwebtoken')

const getNotesByUserid = async (req, res) => {
    let token = null
    let decodedToken = null

    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    try {
      decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (e) {
      res.status(401).send({ error: 'Token missing or invalid' })
      return
    }
    
    const notes = await notesByUseridService.getNotesByUserid(decodedToken.id)
    res.send({ status: 'OK', data: notes })
}

module.exports = {
    getNotesByUserid
}