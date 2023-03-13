const bcrypt = require('bcrypt')
const db = require('../db/db.js')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body

    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email])

    const passwordCorrect = user[0] === null
    ? false
    : await bcrypt.compare(password, user[0].password)

    if (!passwordCorrect || !user[0]) {
        return res.status(401).json({
          error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user[0].id,
        email: user[0].email,
        admin: user[0].admin
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return res.status(200).send({ token })
}

module.exports = { login }