import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export default function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.id
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
