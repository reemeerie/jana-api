require("dotenv").config();

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 1410
const usersRouter = require("./routes/usersRouter")
const loginRouter = require("./routes/loginRouter")
const notesRouter = require("./routes/notesRouter")
const notesByUseridRouter = require("./routes/notesByUseridRouter")

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({
    message: 'working'
  })
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/notesByUserid', notesByUseridRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})