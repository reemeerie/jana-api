const { createPool } = require("mysql2/promise")
require("dotenv").config()

const db = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 2, // Clever Cloud solo permite abrir 5 conexiones en simultaneo, sin esto
  queueLimit: 0,      // el pool intenta abrir mas de las que el server permite (default: 10)
})

module.exports = db
