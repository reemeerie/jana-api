const { createPool } = require('mysql2/promise')
require("dotenv").config();

const db = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
})

module.exports = db