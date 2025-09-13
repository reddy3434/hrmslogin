import { getPool } from '../config/db.js'

export async function findUserByEmail(email) {
  const pool = getPool()
  const [rows] = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email])
  return rows.length ? rows[0] : null
}

export async function createUser({ name, email, password_hash }) {
  const pool = getPool()
  const [res] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, password_hash])
  return { id: res.insertId, name, email }
}

export async function findUserById(id) {
  const pool = getPool()
  const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [id])
  return rows.length ? rows[0] : null
}
