const jwt = require("jsonwebtoken")

const adminAuthenticated = (req, res, next) => {
  const authorization = req.get("authorization")

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ error: "Token missing" })
  }

  const token = authorization.substring(7)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken

    if (!decodedToken.admin) {
      return res.status(403).json({ error: "Forbbiden (only admin)" })
    }

    next()
  } catch (e) {
    return res.status(401).json({ error: "Token missing or invalid" })
  }
}

module.exports = adminAuthenticated
