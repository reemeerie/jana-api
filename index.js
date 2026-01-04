/* inits */
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 1410
const db = require("./src/db/db")

/* rutas */
const usersRouter = require("./src/routes/usersRouter")
const loginRouter = require("./src/routes/loginRouter")
const notesRouter = require("./src/routes/notesRouter")
const notesByUseridRouter = require("./src/routes/notesByUseridRouter")

/* middlewares */
const errorHandler = require("./src/middlewares/errorMiddleware")

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite
      // agregar acá el dominio de front en prod 
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.options("*", cors())
app.use(express.json())

app.get("/", (_req, res) => {
  return res.json({
    message: "Working 2025",
  })
})

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/notes", notesRouter)
app.use("/api/notesByUserid", notesByUseridRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const shutdown = async () => {
  try {
    console.log("Closing DB pool...")
    await db.end()
  } finally {
    process.exit(0)
  }
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
