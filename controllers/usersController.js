const usersService = require("../services/usersService")
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
    try {
      const users = await usersService.getUsers()
      return res.json({ status: 'OK', data: users })
    } catch (error) {
      console.error(error)
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    const numberID = Number(id)

    if (isNaN(numberID)) {
        res.status(404).send({ warning: 'Has to be a number' })
        return
    }

    try {
      const user = await usersService.getUser(numberID)
      return res.json({ status: 'OK', data: user })
    } catch (error) {
      console.error(error)
    }
}

const createUser = async (req, res) => {
    const request = req.body

    if (!request.name || !request.email || !request.password || !request.password2) {
        res.status(404).send({ warning: 'Missing fields' })
        return
    }

    if (request.password !== request.password2) {
        res.status(404).send({ warning: 'Passwords dont match' })
        return
    }

    const user = {
        name: request.name,
        email: request.email,
        password: request.password
    }

    const createdUser = await usersService.createUser(user)
    res.status(201).send({ status: 'OK', data: createdUser })
}

const editUser = async (req, res) => {
    const changes = req.body
    const { id } = req.params
    const numberID = Number(id)

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

    const editedUser = await usersService.editUser(numberID, changes, decodedToken.id)
    res.send({ status: 'OK', data: editedUser })
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const numberID = Number(id)

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

    const deletedUser = await usersService.deleteUser(numberID, decodedToken.id)
    res.status(410).send({ status: 'OK', data: deletedUser })
}



module.exports = {
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser
}