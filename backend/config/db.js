import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

let pool = null

export async function initDB() {
  if (pool) return pool
  pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '20g21a0434_P',
    database: process.env.DB_NAME || 'login',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
 
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('DB pool created')
  return pool
}

export function getPool() {
  if (!pool) throw new Error('Pool not initialized. Call initDB first.')
  return pool
}
