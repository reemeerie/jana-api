const db = require('./db.js')
const bcrypt = require('bcrypt')

const getUsers = async () => {
    const [users] = await db.query('SELECT * FROM users')
    return users
}
  
const getUser = async (id) => {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    return user
}
  
const createUser = async (newUser) => {
    const [userExists] = await db.query('SELECT * FROM users WHERE email = ?', [newUser.email])
    
    if (userExists.length > 0) {
        return 'User already exists'
    }

    const passwordHash = await bcrypt.hash(newUser.password, 10)

    await db.query(
        'INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)'
        , [newUser.name, newUser.email, passwordHash, false]
    )

    return 'User created succesfully'
}
  
const editUser = async (id, changes, user_id) => {
    const [userExists] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    
    if (userExists.length > 0 && userExists[0].id === user_id) {
        if (changes.password) {
            const newPassword = await bcrypt.hash(changes.password, 10)
    
            await db.query('UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id = ?',
                [changes.name, changes.email, newPassword, id]
            )
            return 'User updated'
        } else {
            await db.query('UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id = ?',
                [changes.name, changes.email, changes.password, id]
            )
            return 'User updated'
        }
    } else return 'User doesnt exist or information belongs to another user' 
}
  
const deleteUser = async (id, user_id) => {
    const [userExists] = await db.query('SELECT * FROM users WHERE id = ?', [id])

    if (userExists.length > 0 && userExists[0].id === user_id) {
        await db.query('DELETE FROM users WHERE id = ?', [id])
        return 'User deleted'
    } else return 'User doesnt exist or information belongs to another user'
}
  
module.exports = {
    getUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
}