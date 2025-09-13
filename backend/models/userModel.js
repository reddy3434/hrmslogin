import { getPool } from '../config/db.js'
export async function createUser({ name, email, password_hash, role }) {
  const pool = getPool()
  const [res] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, role || 'user']
  )
  return { id: res.insertId, name, email, role: role || 'user' }
}

export async function findUserByEmail(email) {
  const pool = getPool()
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  return rows.length ? rows[0] : null
}

export async function findUserById(id) {
  const pool = getPool()
  const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id])
  return rows.length ? rows[0] : null
}
