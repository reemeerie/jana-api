const jwt = require("jsonwebtoken")

const adminAuthenticated = (req, res, next) => {
  const authorization = req.get("authorization")

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ error: "Falta token" })
  }

  const token = authorization.substring(7)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken

    if (!decodedToken.admin) {
      return res.status(403).json({ error: "Prohibido (solo administradores)" })
    }

    next()
  } catch (e) {
    return res.status(401).json({ error: "Token invalido o vencido" })
  }
}

module.exports = adminAuthenticated
