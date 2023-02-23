const { createPool } = require('mysql2/promise')

const db = createPool({
    host: 'localhost',
    user: 'root',
    password: 'sql1234',
    port: 3306,
    database: 'notesdb'
})

module.exports = db