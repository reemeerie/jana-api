const notesService = require("../services/notesService")
const jwt = require('jsonwebtoken')

const getNotes = async (req, res) => {
    try {
      const notes = await notesService.getNotes()
      return res.json({ status: 'OK', data: notes })
    } catch (error) {
      console.error(error)
    }
}

const getNote = async (req, res) => {
    const { id } = req.params
    const numberID = Number(id)

    if (isNaN(numberID)) {
        res.status(404).send({ warning: 'Has to be a number' })
        return
    }

    try {
      const note = await notesService.getNote(numberID)
      return res.json({ status: 'OK', data: note })
    } catch (error) {
      console.error(error)
    }
}

const createNote = async (req, res) => {
    const request = req.body
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

    if (!request.title || !request.date) {
        res.status(404).send({ warning: 'Missing fields' })
        return
    }

    const note = {
        title: request.title,
        content: request.content,
        date: request.date,
        user_id: decodedToken.id
    }

    const createdNote = await notesService.createNote(note)
    res.status(201).send({ status: 'OK', data: createdNote })
}

const editNote = async (req, res) => {
    const changes = req.body
    const { id } = req.params
    const numberID = Number(id)
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

    if (isNaN(numberID)) {
        res.status(404).send({ warning: 'Has to be a number' })
        return
    }

    const editedNote = await notesService.editNote(numberID, changes, decodedToken.id)
    res.send({ status: 'OK', data: editedNote })
}

const deleteNote = async (req, res) => {
    const { id } = req.params
    const numberID = Number(id)
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

    if (isNaN(numberID)) {
        res.status(404).send({ warning: 'Has to be a number' })
        return
    }

    const deletedNote = await notesService.deleteNote(numberID, decodedToken.id)
    res.status(410).send({ status: 'OK', data: deletedNote })
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  editNote,
  deleteNote
}