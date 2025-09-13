import { getPool } from '../config/db.js'

export async function getEmployees() {
  const pool = getPool()
  const [rows] = await pool.query('SELECT * FROM employees ORDER BY id DESC')
  return rows
}

export async function getEmployeeById(id) {
  const pool = getPool()
  const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id])
  return rows[0] || null
}

export async function createEmployee({ name, email, position, salary }) {
  const pool = getPool()
  const [result] = await pool.query(
    'INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)',
    [name, email, position, salary]
  )
  return { id: result.insertId, name, email, position, salary }
}

export async function updateEmployee(id, { name, email, position, salary }) {
  const pool = getPool()
  await pool.query(
    'UPDATE employees SET name=?, email=?, position=?, salary=? WHERE id=?',
    [name, email, position, salary, id]
  )
  return getEmployeeById(id)
}

export async function deleteEmployee(id) {
  const pool = getPool()
  await pool.query('DELETE FROM employees WHERE id=?', [id])
  return true
}
