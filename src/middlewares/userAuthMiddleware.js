const jwt = require("jsonwebtoken")

const userAuthenticated = (req, res, next) => {
  const authorization = req.get("authorization")

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ error: "Token missing" })
  }

  const token = authorization.substring(7)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken

    next()
  } catch {
    return res.status(401).json({ error: "Token missing or invalid" })
  }
}

module.exports = userAuthenticated
