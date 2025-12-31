const loginService = require("../services/loginService.js")

const login = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    const token = await loginService.login(user)

    return res.json({ status: "OK", data: token })
  } catch (err) {
    next(err)
  }
}

module.exports = { login }
