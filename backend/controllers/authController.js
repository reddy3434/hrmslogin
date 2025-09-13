import { findUserByEmail, createUser, findUserById } from '../models/userModel.js'
import { hashPassword, comparePassword } from '../utils/hashPassword.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })

    const existing = await findUserByEmail(email)
    if (existing) return res.status(400).json({ message: 'Email already registered' })

    const password_hash = await hashPassword(password)
    const user = await createUser({ name, email, password_hash, role })
    return res.status(201).json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await comparePassword(password, user.password_hash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const payload = { id: user.id, role: user.role }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}


export async function profile(req, res) {
  try {
    const id = req.userId
    const user = await findUserById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.json({ user })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}
