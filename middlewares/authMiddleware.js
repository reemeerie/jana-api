const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
  let admin = null

  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = null

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    admin = decodedToken.admin
  } catch (e) {
    console.log('Wrong token - jwt: invalid signature')
  }
  return admin
    ? next()
    : res.status(401).json({
      status: 401,
      message: 'Unauthorized'
    })
}

module.exports = isAuthenticated